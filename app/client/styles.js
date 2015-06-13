jss.style = function(style) {
	jss.currentStyleSheet = jss.createStyleSheet(style,{named:false});
	jss.currentStyleSheet.attach();
}

Template.Observations.rendered = function() {
	jss.style({
	});
};

Template.Map.rendered = function() {
	var navHeight = $('nav').height();
	var windowHeight = window.innerHeight;
	var mapHeight = windowHeight - navHeight - 40;
	jss.style({
		'.map-container': {
			height: mapHeight + 'px',
		}
	});
}

