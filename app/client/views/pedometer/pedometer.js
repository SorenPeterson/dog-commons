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
	stop: function() {}
};

Meteor.startup(function() {
	Tracker.autorun(function() {
		var distance = 0;
		var log = GeolocationLog.find().fetch();
		for(var i = 1; i < log.length; i++) {
			distance += log[i].lat;
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
	}
});

Template.Pedometer.helpers({
	logItem: function() {
		return GeolocationLog.find();
	},
	started: function() {
		return Pedometer.started.get();
	},
	distance: function() {
		return Pedometer.distance.get();
	}
});

