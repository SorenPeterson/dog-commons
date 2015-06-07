Template.Observations.helpers({
	observations: function() {
		var today = function() {
			return moment(new Date).format('YYYYMMDD');
		}
		return Observations.find({date: today()});
	}
});

