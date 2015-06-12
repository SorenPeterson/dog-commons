/* Routing */
Router.onBeforeAction(function(args) {
	this.layout('Layout');
	this.next();
});

Router.route('/', function() {
	this.render('Home');
});

Router.route('/home', function() {
	Meteor.call('facebook_feed', function(err, response) {
		var parsed = JSON.parse(response);
		Session.set('FBFeedResponse', parsed);
		console.log(parsed);
	});
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
	this.render('Map');
});

Router.route('/observations', function() {
	this.state.doge = 1;
	this.render('Observations');
});

Router.route('/art');

Router.route('/identification');
