/* Routing */
Router.onBeforeAction(function(args) {
	this.layout('Layout');
	this.next();
	Tracker.nonreactive(function() {
		if(!Session.get('background')) {
			var backgrounds = [
				'url("/butterfly.jpg")',
				'url("/willow.jpg")',
				'url("/caterpillar.jpg")'
			];
			var rn = Math.floor(Math.random() * backgrounds.length);
			Session.set('background', backgrounds[rn]);
		}
	});
});

Router.onBeforeAction(function() {
	Session.set('showHomeButton', 'bounceInUp');
	console.log('hi');
	this.next();
}, {
	except: ['splash', 'home']
});

Router.route('/', function() {
	this.layout(null);
	this.render('Splash');
}, {
	name: 'splash'
});

Router.route('/home', function() {
	Tracker.nonreactive(function() {
		if(Session.get('showHomeButton') !== 'hidden') {
			Session.set('showHomeButton', 'bounceOutDown');
		}
	});
	this.render('Home');
});

Router.route('/map', function() {
	Session.set('pageTitle', 'Mapbox');
	this.render('Map');
});

Router.route('/observations', function() {
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

// REST(ish) API
// Cordova background/foreground can post GPS data HERE
//
// POST data should be in this format
//   {
//     location: {
//       latitude: Number,
//       longitude: Number,
//       accuracy: Match.Optional(Number),
//       speed: Match.Optional(Number),
//       recorded_at: Match.Optional(String)
//     },
//     userId: Match.Optional(String),
//     uuid: Match.Optional(String),
//     device: Match.Optional(String)
//   }

