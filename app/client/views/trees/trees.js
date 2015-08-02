window.Trees = new Mongo.Collection(null);

Meteor.startup(function() {
	for(var i = 0; i < TREE_DATA.length; i++) {
		Trees.insert(TREE_DATA[i]);
	}
});

Template.TreeList.onRendered(function() {
	$('.treelist').height(window.innerHeight - $('.header').height());
});

Template.TreesBack.onRendered(function() {
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

