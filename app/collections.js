try {
	window = global;
} catch(e) {
}

window.GeolocationLog = new Mongo.Collection('GeolocationLog');
window.Photos = new Ground.Collection('photos', {connection: null});
window.Notes = new Ground.Collection('notes', {connection: null});

