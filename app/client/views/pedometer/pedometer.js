Template.Pedometer.events({
	'click .btn.pedometer-start': function() {
		GeolocationBG.start();
	}
});

Template.Pedometer.helpers({
	logItem: function() {
		return GeolocationLog.find();
	}
});
