function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2)
		; 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI/180)
}

var Pedometer = {
	started: new ReactiveVar(false),
	distance: new ReactiveVar(0),
	start: function() {
		var computation = Tracker.autorun(function() {
			if(!!Geolocation.latLng()) {
				GeolocationLog.insert(Geolocation.latLng());
			}
		});
		this.stop = function() {
			computation.stop();
			this.started.set(false);
		};
		this.started.set(true);
	},
	stop: function() {},
	miles: function() {
		return (this.distance.get() * 0.621371).toFixed(2);
	},
	steps: function() {
		return Math.floor(this.miles() * 2000);
	}
};

Meteor.startup(function() {
	Tracker.autorun(function() {
		var distance = 0;
		var log = GeolocationLog.find().fetch();
		for(var i = 1; i < log.length; i++) {
			distance += getDistanceFromLatLonInKm(log[i-1].lat, log[i-1].lng, log[i].lat, log[i].lng);
		}
		Pedometer.distance.set(distance);
	});
});

Template.Pedometer.events({
	'click .btn.pedometer-start': function() {
		Pedometer.start();
	},
	'click .btn.pedometer-stop': function() {
		Pedometer.stop();
	},
	'click .btn.pedometer-reset': function() {
		GeolocationLog.remove({});
	}
});

Template.Pedometer.helpers({
	logItem: function() {
		return GeolocationLog.find();
	},
	started: function() {
		return Pedometer.started.get();
	},
	miles: function() {
		return Pedometer.miles();
	},
	steps: function() {
		return Pedometer.steps();
	}
});

