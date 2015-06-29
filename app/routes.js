/* Routing */
Router.onBeforeAction(function(args) {
	this.layout('Layout');
	this.next();
	Tracker.nonreactive(function() {
		if(!Session.get('background')) {
			var backgrounds = [
				'url("/butterfly.jpg")',
				'url("/purpleflower.jpg")',
				'url("/blossom.jpg")'
			];
			var rn = Math.floor(Math.random() * backgrounds.length);
			Session.set('background', backgrounds[rn]);
		}
	});
});

Router.route('/', function() {
	this.layout(null);
	this.render('Splash');
});

Router.route('/home', function() {
	Session.set('pageTitle', 'Nature Based Therapy');
	this.layout('Layout', {
		data: function() {
			return {
				isHome: true
			}
		}
	});
	this.render('Home');
});

Router.route('/map', function() {
	Session.set('pageTitle', 'Mapbox');
	this.render('Map');
});

Router.route('/observations', function() {
	this.state.doge = 1;
	Session.set('pageTitle', 'Observation Diary');
	this.render('Observations');
});

Router.route('/art', function() {
	Session.set('pageTitle', '3030 Art');
	this.render('Art');
});

Router.route('/identification', function() {
	Session.set('pageTitle', 'Wildlife Identification');
	this.render('Identification');
});
