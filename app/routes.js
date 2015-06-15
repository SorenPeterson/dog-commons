/* Routing */
Router.onBeforeAction(function(args) {
	this.layout('Layout');
	this.next();
	var backgrounds = [
		'url("/butterfly.jpg")',
		'url("/purpleflower.jpg")',
		'url("/blossom.jpg")'
	];
	var rn = Math.floor(Math.random() * backgrounds.length);
	Session.set('background', backgrounds[rn]);
});

Router.route('/', function() {
	this.layout(null);
	this.render('Splash');
});

Router.route('/home', function() {
	Session.set('pageTitle', 'Nature Based Therapy');
	this.render('Home');
});

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
	Session.set('pageTitle', 'Google Maps');
	this.render('Map');
});

Router.route('/map2', function() {
	Session.set('pageTitle', 'Mapbox');
	this.render('Map2');
});

Router.route('/observations', function() {
	this.state.doge = 1;
	Session.set('pageTitle', 'Observation Diary');
	this.render('Observations');
});

Router.route('/art', function() {
	Session.set('pageTitle', '3030 Art');
	this.render('Art');
});

Router.route('/identification', function() {
	Session.set('pageTitle', 'Wildlife Identification');
	this.render('Identification');
});
