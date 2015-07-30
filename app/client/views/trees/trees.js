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

Router.route('/trees/tree/:id', function() {
	this.render('SingleTree', {
		data: function() {
			return {
				tree: Trees.findOne({_id: this.params.id})
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
