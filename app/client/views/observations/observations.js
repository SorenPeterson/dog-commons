var Helpers = {
	title: function(note) {
		return (note.content || '').shrink(100);
	}
};

Template.Observations.helpers(Helpers);
Template.Observations.helpers({
	notes: function() {
		return Notes.find();
	},
	created: function(note) {
		return moment(note.createdAt).calendar();
	},
	hideMsg: function() {
		return Session.get('hideObsMsg');
	}
});

Template.Observations.events({
	'click .add': function(evt, tmpl) {
		console.log(tmpl);
		Blaze.remove(tmpl.view);
		var id = Notes.insert({
			createdAt: (new Date).toISOString(),
		});
		Router.go('/observations/edit/' + id);
	},
	'click .note-compact': function(e, tmpl) {
		Router.go('/observations/edit/' + e.target.dataset.id);
	}
});

Template.Observations.helpers(Helpers);
Template.EditObservation.events({
	'click .close': function() {
		Router.go('/observations');
	},
	'click .save': function() {
		var content = $('div.content').text();
		Notes.update({
			_id: this.openNote._id
		}, {
			$set: {
				content: content
			}
		});
		Router.go('/observations');
	},
	'click .delete': function() {
		Notes.remove({
			_id: this.openNote._id
		});
		Router.go('/observations');
	},
	'click .picture': function(evt, tmpl) {
		MeteorCamera.getPicture(function(error, data) {
			if(!error) {
				Photos.insert({
					noteId: tmpl.data.openNote._id,
					uri: data
				});
			}
		});
	},
	keydown: function(e) {
		if(e.keyCode === 13)
			e.preventDefault();
	}
});

Template.EditObservation.helpers({
	photos: function() {
		return Photos.find({noteId: this._id});
	}
});

