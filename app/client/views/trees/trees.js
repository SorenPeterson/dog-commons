window.Trees = new Mongo.Collection(null);

Router.route('/trees', function() {
	Session.set('pageTitle', 'Tree Identification');
	this.render('Trees');
});

Router.route('/trees/type/:type', function() {
	this.render('TreeList', {
		data: function() {
			return {
				trees: Trees.find({type: this.params.type})
			}
		}
	});
});

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

