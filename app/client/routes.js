Router.onBeforeAction(function() {
	this.layout('Layout');
	this.next();
});

Router.route('/', function() {
	this.render('Splash');
});

Router.route('/home');

Router.route('/map', function() {
	GoogleMaps.ready('mainMap', function(map) {
		var overlayBounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(44.85, -93.632),
			new google.maps.LatLng(44.87, -93.597));
		var mapOverlay = new google.maps.GroundOverlay('http://otterhive.com/img/backgrounds/doge.gif', overlayBounds);
		mapOverlay.setMap(map.instance);
	});
	this.render('Map');
});

Router.route('/observations');
