window.Observations = new Ground.Collection('observations', {connection: null});

Meteor.startup(function() {
	GoogleMaps.load();
	Session.set('ObservationsShowAll', true);
});

Meteor.subscribe('observations');

Template.registerHelper('isCordova', function() {
	return Meteor.icCordova;
});

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

/* Routing */
(function() {
	Router.onBeforeAction(function(args) {
		if(args.url !== '/') {
			this.layout('Layout');
		}
		this.next();
	});

	Router.route('/', function() {
		this.render('Splash');
	});

	Router.route('/home');

	Router.route('/map', function() {
		GoogleMaps.ready('mainMap', function(map) {
			var south = 44.851;
			var west = -93.6278;
			var LatDiff = 0.016;
			var LngDiff = 0.027;
			var north = south + LatDiff;
			var east = west + LngDiff;
			var overlayBounds = new google.maps.LatLngBounds(
				// LatLngBounds(SouthWest, NorthEast);
				new google.maps.LatLng(south, west),
				new google.maps.LatLng(north, east));
			var mapOverlay = new google.maps.GroundOverlay('map.gif', overlayBounds);
			mapOverlay.setMap(map.instance);
		});
		this.render('Map');
	});

	Router.route('/observations', function() {
		this.state.doge = 1;
		this.render('Observations');
	});

	Template.Map.helpers({
		mapOptions: function() {
			if(GoogleMaps.loaded()) {
				return {
					center: new google.maps.LatLng(44.858948, -93.614045),
					zoom: 14
				};
			}
		}
	});
})();

var today = function() {
	return moment(new Date).format('YYYYMMDD');
}

Template.Observations.helpers({
	observations: function() {
		return Observations.find({date: today()});
	},
	allObservations: function() {
		return Observations.find({});
	},
	showAll: function() {
		return Session.get('ObservationsShowAll');
	}
});
Template.Observations.helpers(Velociratchet.helpers);

Template.Observations.events({
	'submit form': function(e, tmpl) {
		e.preventDefault();
		var textArea = tmpl.find('textarea');
		if(textArea.value !== '') {
			if(Observations.find({date: today()}).count() < 3) {
				Observations.insert({date: today(), content: textArea.value });
			} else {
				alert('no more today');
			}
			textArea.value = '';
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
Template.Observations.events(Velociratchet.events);

window.DataBase = (function() {
	var today = function() {
		return moment(new Date).format('YYYYMMDD');
	};

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

