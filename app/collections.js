try {
	window = global;
} catch(e) {
}

window.GeolocationLog = new Ground.Collection('GeolocationLog', {connection: null});
window.Photos = new Ground.Collection('photos', {connection: null});
window.Notes = new Ground.Collection('notes', {connection: null});

