Meteor.publish('observations', function() {
	return Observations.find();
});
