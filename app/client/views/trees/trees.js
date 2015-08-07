Meteor.startup(function() {
	if(Trees.find({}).count() < 52) {
		Trees.remove({});
		for(var i = 0; i < TREE_DATA.length; i++) {
			Trees.insert(TREE_DATA[i]);
		}
	}
});

var scroll = new ReactiveVar(0);
Tracker.autorun(function() {
	console.log(scroll.get());
});
Template.TreeList.onRendered(function() {
	scrollTo(0, scroll.get());
});
Template.TreeList.events({
	'click .trees-back-text': function() {
		scroll.set(0);
	},
	'click .treelist a': function() {
		scroll.set(scrollY);
	}
});
Template.SingleTree.onRendered(function() {
	scrollTo(0, 0);
});

/*Template.Trees.events({
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
}*/
