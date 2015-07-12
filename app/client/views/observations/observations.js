var ShowAll = new ReactiveVar(false);
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
});

