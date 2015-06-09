Template.Map.helpers({
	mapOptions: function() {
		if(GoogleMaps.loaded()) {
			return {
				center: new google.maps.LatLng(44.858948, -93.614045),
				zoom: 14
			};
		}
	}
});

