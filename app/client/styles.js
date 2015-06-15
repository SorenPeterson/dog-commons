var currentStyleSheet = jss.createStyleSheet({});
currentStyleSheet.attach();

jss.style = function(style) {
	Tracker.autorun(function() {
		currentStyleSheet.detach();
		currentStyleSheet = jss.createStyleSheet(style(),{named:false});
		currentStyleSheet.attach();
	});
}

Template.Layout.onRendered(function() {
	jss.style(function() {
		return {
			body: {
				background: Session.get('background') + ' no-repeat center center fixed',
				'-webkit-background-size': 'cover',
				'-moz-background-size': 'cover',
				'-o-background-size': 'cover',
				'background-size': 'cover',
			}
		}
	});
});

Template.Splash.onRendered(function() {
	if(innerWidth < 768) {
		$('.splash-enter').fitText(1.1);
	}
});

Template.Map2.onRendered(function() {
	this.autorun(function() {
		if(Mapbox.loaded()) {
			L.mapbox.accessToken = 'pk.eyJ1Ijoic29yZW40NjgiLCJhIjoiOTZiMTc3MThlZjFlMTFmOGQ0NjIwNzcwODJhZTM4YWQifQ.Ycl3ox-mvLD4IM64nGNCxA';
			window.map = L.mapbox.map('map', 'soren468.2db88a2d');
		}
	});
});
