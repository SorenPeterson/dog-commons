Template.Splash.onRendered(function() {
	$('.splash-inner h1').fitText(0.7);
	$('.splash-inner span').fitText(0.15);
});

if(Meteor.isCordova) {
	Template.Splash.onRendered(function() {
		StatusBar.hide();
	});
	Template.Splash.onDestroyed(function() {
		StatusBar.show();
	});
}
