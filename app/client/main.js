window.Observations = new Ground.Collection('observations', {connection: null});

Meteor.startup(function() {
	Mapbox.load();

	Meteor.subscribe('GeolocationLog');
		
	if(Meteor.isCordova) {
		GeolocationBG.config({
			url: 'http://nbt.otterhive.com/api/geolocation',
			params: {
			},
			headers: {
			},
			desiredAccuracy: 10,
			stationaryRadius: 20,
			distanceFilter: 30,
			notificationTitle: 'BackgroundGPS',
			notificationsText: 'ENABLED',
			activityType: 'Automotive Navigation',
			debug: false
		});

		GeolocationBG.bgGeo.configure(function(location) {
			GeolocationLog.insert(location);
		}, function(error) {
			console.log('error: ', error);
		}, GeolocationBG.options);
	}
});

Template.Layout.events({
	'click a.in-app-browser': function(evt, tmpl) {
		evt.preventDefault();
		var href = $(evt.target).closest('a').attr('href');
		window.open(href, '_blank', 'location=yes');
	}
});

