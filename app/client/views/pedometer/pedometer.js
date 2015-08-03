var Pedometer = {
	started: new ReactiveVar(false),
	start: function() {
		GeolocationBG.start();
	},
	stop: function() {
		GeolocationBG.stop();
	}
};

Template.Pedometer.events({
	'click .btn.pedometer-start': function() {
		GeolocationBG.start();
	}
});

Template.Pedometer.helpers({
	logItem: function() {
		return GeolocationLog.find();
	},
	started: function() {
		
	}
});

