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
			state = Session.get('ObservationsShowAll');
			state = !state;
		});
		Session.set('ObservationsShowAll', state);
	},
	'keyup input[type=text]': function(e, tmpl) {
		if(e.keyCode === 13) {
			tmpl.find('.record').click();
		}
	}
});

