Template.Splash.onRendered(function() {
	$('.splash h1').fitText(0.7);
	$('.splash a').fitText(0.15);
});

if(Meteor.isCordova) {
	Template.Splash.onRendered(function() {
		StatusBar.hide();
	});
	Template.Splash.onDestroyed(function() {
		StatusBar.show();
	});
}
