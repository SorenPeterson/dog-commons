Meteor.publish('GeolocationLog', () => {
	return GeolocationLog.find();
});

