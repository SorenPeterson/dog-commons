window.Observations = new Ground.Collection('observations', {connection: null});

Meteor.startup(function() {
	GoogleMaps.load();
});

Meteor.subscribe('observations');

if(Meteor.isCordova) {
	GeolocationBG.config({
		url: 'http://example.com/api/geolocation',
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
}
