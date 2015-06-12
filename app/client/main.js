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

window.DataBase = (function() {
	var today = Helpers.today();

	var save = function(obj) {
		Session.setPermanent('nbtappdb', obj);
	}

	var fromDB = function() {
		return Session.get('nbtappdb') || {};
	}

	var todaysObservations = function() {
		return fromDB()[today()] || [];
	};

	var insert = function(obs) {
		var dbObj = fromDB();
		var today = today();
		dbObj[today] = dbObj[today] || [];
		dbObj[today].push(obs);
		save(dbObj);
	};

	var remove = function() {
	};

	return {
		todaysObservations: todaysObservations,
		insert: insert,
		remove: remove
	};
})();

