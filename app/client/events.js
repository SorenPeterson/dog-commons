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
		Observations.remove({_id: e.target.dataset.id});
	},
	'click .show-all': function() {
		var state;
		Tracker.nonreactive(function() {
			state = Session.get('ObservationsShowAll');
			state = !state;
		});
		Session.set('ObservationsShowAll', state);
	}
});

Template.Layout.events({
	'click button.navbar-toggle': function(e, tmpl) {
		$('div.navbar').toggle();
	},
	'click #navbar ul a': function(e, tmpl) {
		$('button.navbar-toggle').click();
	}
});

