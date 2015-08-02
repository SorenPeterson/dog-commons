Template.Pedometer.events({
	'click .btn.pedometer-start': function() {
		pedometer.startPedometerUpdates(function(something) {
			alert(something);
		},
		function(error) {
			alert('error: ' + error);
		});
	}
});
