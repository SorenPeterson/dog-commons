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
			var xstart = 44.865549;
			var ystart = -93.594901;
			var xdiff = 0.012108529;
			var ydiff = 0.032895851;
			var xend = xstart - xdiff;
			var yend = ystart - ydiff;
			var overlayBounds = new google.maps.LatLngBounds(
				// LatLngBounds(SouthWest, NorthEast);
				new google.maps.LatLng(xend, yend),
				new google.maps.LatLng(xstart, ystart));
			var mapOverlay = new google.maps.GroundOverlay('testmap.gif', overlayBounds);
			mapOverlay.setMap(map.instance);
		});
		this.render('Map');
	});

	Router.route('/observations');
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

