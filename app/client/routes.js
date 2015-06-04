Router.route('/', function() {
	this.render('Splash');
});

Router.route('/home');

Router.route('/map', function() {
	GoogleMaps.ready('mainMap', function(map) {
		var overlayBounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(40.712216, -74.22655),
			new google.maps.LatLng(40.773941, -74.12544));
		var mapOverlay = new google.maps.GroundOverlay('https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg', overlayBounds);
		mapOverlay.setMap(map.instance);
	});
	this.render('Map');
});

Router.route('/observations');
