window.Observations = new Ground.Collection('observations', {connection: null});

Meteor.startup(function() {
	GoogleMaps.load();
});

Meteor.subscribe('observations');

Template.registerHelper('isCordova', function() {
	return Meteor.isCordova;
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

Helpers = {
	today: function() {
		return moment(new Date).format('YYYYMMDD');
	},
	showAll: function() {
		return Session.get('ObservationsShowAll');
	}
}

Template.Home.helpers({
	recentPost: function() {
		var data = Session.get('FBFeedResponse');
		data = data || {};
		data = data.data || [];
		return data;
	},
	postsLoaded: function() {
		return !!Session.get('FBFeedResponse');
	}
})

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
Template.Observations.helpers(Velociratchet.helpers);

Template.Observations.events({
	'submit form': function(e, tmpl) {
		e.preventDefault();
		var textArea = tmpl.find('textarea');
		if(textArea.value !== '') {
			if(Observations.find({date: Helpers.today()}).count() < 3) {
				Observations.insert({date: Helpers.today(), content: textArea.value });
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

