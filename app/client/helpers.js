Template.registerHelper('isCordova', function() {
	return Meteor.isCordova;
});

Helpers = {
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

Template.Observations.helpers(Helpers);

