Meteor.startup(function() {
	Mapbox.load();
});

Template.Layout.events({
	'click a.in-app-browser': function(evt, tmpl) {
		evt.preventDefault();
		var href = $(evt.target).closest('a').attr('href');
		window.open(href, '_blank', 'location=yes');
	},
	'click a.system-browser': function(evt, tmpl) {
		evt.preventDefault();
		var href = $(evt.target).closest('a').attr('href');
		window.open(href, '_system', 'location=yes');
	}
});

