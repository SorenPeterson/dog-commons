/* Routing */
Router.onBeforeAction(function(args) {
	this.layout('Layout');
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
	this.next();
}, {
	except: ['GeolocationBGRoute']
});

Router.onBeforeAction(function() {
	Session.set('showHomeButton', 'bounceInUp');
	this.next();
}, {
	except: ['splash', 'home', 'GeolocationBGRoute']
});

Router.route('/', function() {
	this.layout(null);
	this.render('Splash');
}, {
	name: 'splash'
});

Router.route('/home', function() {
	Session.set('pageTitle', 'Nature Heals');
	Tracker.nonreactive(function() {
		if(Session.get('showHomeButton') !== 'hidden') {
			Session.set('showHomeButton', 'bounceOutDown');
		}
	});
	/*this.layout('Layout', {
		data: {
			hideNav: true
		}
	});*/
	this.layout(null);
	this.render('Home');
});

Router.route('/map', function() {
	Session.set('pageTitle', 'Map');
	this.render('Map');
});

Router.route('/observations', function() {
	Session.set('pageTitle', 'Observation Diary');
	this.render('Observations');
});

Router.route('/art', function() {
	Session.set('pageTitle', '3030 Project');
	this.render('Art');
});

Router.route('/trees', function() {
	Session.set('pageTitle', 'Tree Identification');
	this.render('Trees');
});

Router.route('/pedometer', function() {
	Session.set('pageTitle', 'Pedometer');
	this.render('Pedometer');
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

Router.route('/api/geolocation', function() {
	// GET, POST, PUT, DELETE
	var requestMethod = this.request.method;
	// Data from a POST request
	var requestData = this.request.body;

	// log stuff
	console.log('GeolocationBG post: ' + requestMethod);
	console.log(JSON.stringify(requestData));

	// TODO: security/validation
	//  require some security with data
	//  validate userId/uuid/etc (inside Meteor.call?)

	// Can insert into a Collection from the server (or whatever)
	if (GeolocationLog.insert(requestData)) {
		this.response.writeHead(200, {'Content-Type': 'application/json'});
		this.response.end('ok');
		return;
	}

	// if we end up with an error case, you can return 500
	this.response.writeHead(500, {'Content-Type': 'application/json'});
	this.response.end('failure');
}, {
	where: 'server',
	name: 'GeolocationBGRoute'
});

