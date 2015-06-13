jss.style = function(style) {
	jss.currentStyleSheet = jss.createStyleSheet(style,{named:false});
	jss.currentStyleSheet.attach();
}

Template.Map.onRendered(function() {
	var navHeight = $('nav').height();
	var windowHeight = window.innerHeight;
	var mapHeight = windowHeight - navHeight;
	jss.style({
		'.map-container': {
			height: mapHeight + 'px',
		}
	});
});

Template.Map2.onRendered(function() {
	var navHeight = $('nav').height();
	var windowHeight = window.innerHeight;
	var mapHeight = windowHeight - navHeight;
	jss.style({
		'#map': {
			height: mapHeight + 'px',
		}
	});
	this.autorun(function() {
		if(Mapbox.loaded()) {
			L.mapbox.accessToken = 'pk.eyJ1Ijoic29yZW40NjgiLCJhIjoiOTZiMTc3MThlZjFlMTFmOGQ0NjIwNzcwODJhZTM4YWQifQ.Ycl3ox-mvLD4IM64nGNCxA';
			window.map = L.mapbox.map('map', 'soren468.2db88a2d');
		}
	});
});
