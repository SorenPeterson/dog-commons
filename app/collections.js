try {
	window = global;
} catch(e) {
}

window.GeolocationLog = new Mongo.Collection('GeolocationLog');

