Template.Splash.onRendered(function() {
	$('.splash h1').fitText(0.7);
	setTimeout(function() {
		Router.go('/home');
	}, 2000);
});
