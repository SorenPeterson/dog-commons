jss.style = function(style) {
	jss.currentStyleSheet = jss.createStyleSheet(style,{named:false});
	jss.currentStyleSheet.attach();
}

Template.Map.rendered = function() {
	var navHeight = $('nav').height();
	var windowHeight = window.innerHeight;
	var mapHeight = windowHeight - navHeight;
	jss.style({
		'.map-container': {
			height: mapHeight + 'px',
		}
	});
}

