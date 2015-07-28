window.Trees = new Mongo.Collection(null);

Meteor.startup(function() {
	for(var i = 0; i < TREE_DATA.length; i++) {
		Trees.insert(TREE_DATA[i]);
	}
});

Template.Trees.onRendered(function() {
	$('div.title').fitText();
});

Template.Trees.helpers({
	trees: function() {
		return Trees.find({});
	}
});

