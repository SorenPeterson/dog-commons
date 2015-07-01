Template.registerHelper('isCordova', function() {
	return Meteor.isCordova;
});

Helpers = {
	showAll: function() {
		return Session.get('ObservationsShowAll');
	}
}

Template.Layout.helpers({
	options: function() {
		return {
		}
	},
	pageTitle: function() {
		return Session.get('pageTitle');
	},
	showHomeButton: function() {
		return Session.get('showHomeButton');
	}
});

Template.Observations.helpers({
	observations: function() {
		var parameters = {};
		if(!Helpers.showAll()) {
			parameters.date = Helpers.today();
		}
		return Observations.find(parameters).fetch().reverse();
	}
});
Template.Observations.helpers(Helpers);

