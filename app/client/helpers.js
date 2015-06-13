Template.registerHelper('isCordova', function() {
	return Meteor.isCordova;
});

Helpers = {
	today: function() {
		return moment(new Date).format('YYYYMMDD');
	},
	showAll: function() {
		return Session.get('ObservationsShowAll');
	}
}

Template.Layout.helpers({
	options: function() {
		return {
		}
	}
});

Template.Home.helpers({
	recentPost: function() {
		var data = Session.get('FBFeedResponse');
		data = data || {};
		data = data.data || [];
		return data;
	},
	postsLoaded: function() {
		return !!Session.get('FBFeedResponse');
	}
})

Template.Observations.helpers({
	observations: function() {
		var parameters = {};
		if(!Helpers.showAll()) {
			parameters.date = Helpers.today();
		}
		return Observations.find(parameters).fetch().reverse();
	}
});
Template.Observations.helpers(Helpers);

Template.Map.helpers({
	mapOptions: function() {
		if(GoogleMaps.loaded()) {
			return {
				center: new google.maps.LatLng(44.858948, -93.614045),
				zoom: 14,
				mapTypeId: google.maps.MapTypeId.SATELLITE
			};
		}
	}
});

