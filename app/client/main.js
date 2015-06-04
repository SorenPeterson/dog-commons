Template.Observations.helpers({
	observations: function() {
		var dbObj = Session.get('nbtappdb') || {};
		var today = moment(new Date()).format('YYYYMMDD');
		var todaysObservations = dbObj[today] || [];
		todaysObservations.push('hi');
		return todaysObservations;
	}
});

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

Meteor.startup(function() {
	GoogleMaps.load();
});
