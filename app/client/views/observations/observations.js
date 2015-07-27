/*var ShowAll = new ReactiveVar(false);
var EditMode = new ReactiveVar(false);

var Helpers = {
	today: function() {
		return moment().format('YYYYMMDD');
	},
	showAll: function() {
		return ShowAll.get();
	},
	editMode: function() {
		return EditMode.get();
	}
}

Template.Observations.helpers(Helpers);

Template.Observations.helpers({
	observations: function() {
		var parameters = {};
		if(!Helpers.showAll()) {
			parameters.date = Helpers.today();
		}
		return Observations.find(parameters).fetch().reverse();
	}
});

Template.Observations.events({
	'click .record': function(e, tmpl) {
		var input = tmpl.find('input[type=text]');
		if(input.value !== '') {
			if(Observations.find({date: Helpers.today()}).count() < 3) {
				Observations.insert({date: Helpers.today(), content: input.value });
			} else {
				alert('no more today');
			}
			input.value = '';
		}
	},
	'click .delete': function(e, tmpl) {
		var id = e.target.dataset.id || e.target.parentNode.dataset.id;
		Observations.remove({_id: id});
	},
	'click .show-all': function() {
		var state;
		Tracker.nonreactive(function() {
			state = ShowAll.get();
			state = !state;
		});
		ShowAll.set(state);
	},
	'click .edit': function(e, tmpl) {
		var state;
		Tracker.nonreactive(function() {
			state = EditMode.get();
			state = !state;
		});
		EditMode.set(state);
	},
	'keyup input[type=text]': function(e, tmpl) {
		if(e.keyCode === 13) {
			tmpl.find('.record').click();
		}
	}
});*/

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
		var title = $('h1').text();
		var content = $('div.content').text();
		Notes.update({
			_id: editingNoteId.get()
		}, {
			$set: {
				title: title,
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
		MeteorCamera.getPicture(function() {
			console.log(arguments);
			alert(' have happened');
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

