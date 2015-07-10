Template.Map.onRendered(function() {
	$('#map').height(window.innerHeight - 60);
});

Template.Map.onRendered(function() {
	this.autorun(function() {
		if(Mapbox.loaded()) {
			L.mapbox.accessToken = 'pk.eyJ1Ijoic29yZW40NjgiLCJhIjoiOTZiMTc3MThlZjFlMTFmOGQ0NjIwNzcwODJhZTM4YWQifQ.Ycl3ox-mvLD4IM64nGNCxA';
			window.map = L.mapbox.map('map', 'soren468.2db88a2d');
		}
	});
});

