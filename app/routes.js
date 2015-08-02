/* Routing */
Router.onBeforeAction(function(args) {
	this.layout('Layout');
	this.next();
}, {
	except: ['GeolocationBGRoute']
});

Router.route('/', function() {
	this.render('Splash');
}, {
	name: 'splash'
});

Router.route('/home');
Router.route('/map');
Router.route('/art');
Router.route('/birds');
Router.route('/pedometer');

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

