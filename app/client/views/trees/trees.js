window.Trees = new Mongo.Collection(null);

Router.route('/trees', function() {
	Session.set('pageTitle', 'Tree Identification');
	this.render('Trees');
});

Router.route('/trees/type/:type', function() {
	Session.set('treesBackUrl', this.originalUrl);
	this.layout(null);
	this.render('TreeList', {
		data: function() {
			return {
				trees: Trees.find({type: this.params.type})
			}
		}
	});
});

Router.route('/trees/search/:phrase', function() {
	Session.set('treesBackUrl', this.originalUrl);
	this.layout(null);
	this.render('TreeList', {
		data: function() {
			return {
				trees: Trees.find({}).map(function(obj) {
					return new Tree(obj);
				}).sort((function(a, b) {
					var a = a.rank(this.params.phrase);
					var b = b.rank(this.params.phrase);
					if(a > b) {
						return -1;
					} else if (a === b) {
						return 0;
					} else {
						return 1;
					}
				}).bind(this))
			}
		}
	});
});

Router.route('/trees/tree/:id', function() {
	if(!Session.get('treesBackUrl')) {
		Router.go('/trees');
	}
	this.layout(null);
	this.render('SingleTree', {
		data: function() {
			return {
				tree: Trees.findOne({_id: this.params.id}),
				back: Session.get('treesBackUrl')
			}
		}
	});
});

Meteor.startup(function() {
	for(var i = 0; i < TREE_DATA.length; i++) {
		Trees.insert(TREE_DATA[i]);
	}
});

Template.TreeList.onRendered(function() {
	$('.treelist').height(window.innerHeight - $('.header').height());
	$('.trees-back-text').fitText();
});

Template.SingleTree.onRendered(function() {
	$('.trees-back-text').fitText();
});

Template.Trees.onRendered(function() {
	$('div.title').fitText();
});

Template.Trees.events({
	'submit form': function(evt, tmpl) {
		evt.preventDefault();
		var value = tmpl.find('input[type=text]').value;
		if(value.length > 0) {
			Router.go('/trees/search/' + value);
		}
	}
});

window.Tree = function(obj) {
	this.combined = "";
	for(i in obj) {
		this[i] = obj[i];
		this.combined += obj[i];
	}
}

Tree.prototype.occurrences = function(word) {
	var pattern = new RegExp(word, 'gi');
	return (this.combined.match(pattern) || []).length;
}

Tree.prototype.rank = function(phrase) {
	phrase = phrase.toLowerCase().split(' ').sort().join(' ');
	var count = 0;
	this.rank = this.rank || {};
	if(this.rank[phrase] !== undefined) {
		return this.rank[phrase];
	}
	var terms = phrase.split(' ');
	for(i in terms) {
		count += this.occurrences(terms[i]);
	}
	this.rank[phrase];
	return count;
}

