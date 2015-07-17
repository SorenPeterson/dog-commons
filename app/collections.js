try {
	window = global;
} catch(e) {
}

window.GeolocationLog = new Mongo.Collection('GeolocationLog');

window.Notes = new Ground.Collection('notes', { connection: null });

