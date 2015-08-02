Template.Splash.onRendered(function() {
	$('.splash h1').fitText(0.7);
	$('.splash span').fitText(0.15);
});

Template.Splash.events({
	'click': function() {
		Router.go('/home');
	}
});

if(Meteor.isCordova) {
	Template.Splash.onRendered(function() {
		StatusBar.hide();
	});
	Template.Splash.onDestroyed(function() {
		StatusBar.show();
	});
}
