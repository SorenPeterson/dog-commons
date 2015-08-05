window.map = undefined;

Template.Map.onRendered(function() {
	$('#map').height(window.innerHeight - 60);
});


Meteor.startup(function() {
	var marker;
	Tracker.autorun(function() {
		if(Mapbox.loaded()) {
			marker ? marker.remove : 1;
			var currentLocation = Geolocation.latLng();
			if(currentLocation) {
				//marker = L.marker([currentLocation.lat, currentLocation.lng], {}).addTo(map);
			}
		}
	});
});

Template.Map.onRendered(function() {
	this.autorun(function() {
		if(Mapbox.loaded()) {
			mapboxOnLoaded();
		}
	});
});

var mapboxOnLoaded = function() {
	L.mapbox.accessToken = 'pk.eyJ1Ijoic29yZW40NjgiLCJhIjoiOTZiMTc3MThlZjFlMTFmOGQ0NjIwNzcwODJhZTM4YWQifQ.Ycl3ox-mvLD4IM64nGNCxA';
	map = L.mapbox.map('map', 'soren468.2db88a2d');
	var center = new L.LatLng(44.859180, -93.614343);
	map.setView(center, 14);
};

