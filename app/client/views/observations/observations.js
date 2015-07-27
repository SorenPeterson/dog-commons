var editingNoteId = new ReactiveVar();

Template.Observations.onRendered(function() {
	$('div.title').fitText();
});

Template.Observations.helpers({
	notes: function() {
		return Notes.find();
	},
	created: function(note) {
		return moment(note.createdAt).calendar();
	},
	editing: function() {
		return !!editingNoteId.get();
	},
	openNote: function() {
		return Notes.findOne({_id: editingNoteId.get() });
	},
	hideMsg: function() {
		return Session.get('hideObsMsg');
	},
	title: function(note) {
		return note.content.shrink(100);
	}
});

Template.Observations.events({
	'click .add': function() {
		Notes.insert({
			createdAt: (new Date).toISOString(),
		});
	},
	'click .close': function() {
		editingNoteId.set(null);
	},
	'click .save': function() {
		var content = $('div.content').text();
		Notes.update({
			_id: editingNoteId.get()
		}, {
			$set: {
				content: content
			}
		});
		$('.close').click();
	},
	'click .delete': function() {
		Notes.remove({
			_id: editingNoteId.get()
		});
		$('.close').click();
	},
	'click .picture': function() {
		MeteorCamera.getPicture(function(error, data) {
			var img = document.createElement('img');
			img.src = data;
			$('.note-expanded').append(img);
		});
	},
	'click .note-compact': function(e, tmpl) {
		editingNoteId.set(e.target.dataset.id);
	},
	keydown: function(e) {
		if(e.keyCode === 13)
			e.preventDefault();
	}
});

Template.ObservationsMsg.events({
	'click .button.close': function() {
		Session.set('hideObsMsg', true);
	},
	'click .button.dontShow': function() {
		Session.setPersistent('hideObsMsg', true);
	}
});

