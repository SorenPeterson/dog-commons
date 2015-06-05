Template.Observations.helpers({
	observations: function() {
		var dbObj = Session.get('nbtappdb') || {};
		var today = moment(new Date()).format('YYYYMMDD');
		var todaysObservations = dbObj[today] || [];
		todaysObservations.push('hi');
		return todaysObservations;
	}
});

