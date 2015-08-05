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
Router.route('/blank');
Router.route('/map');
Router.route('/art');
Router.route('/birds');
Router.route('/pedometer');
Router.route('/mla');

Router.route('/observations');
Router.route('/observations/edit/:id', function() {
	this.render('EditObservation', {
		data: function() {
			return {
				openNote: Notes.findOne({_id: this.params.id})
			}
		}
	});
});

Router.route('/trees');
Router.route('/trees/type/:type', function() {
	Session.set('treesBackUrl', this.originalUrl);
	this.render('TreeList', {
		data: function() {
			return {
				trees: Trees.find({type: this.params.type}),
				back: '/trees'
			}
		}
	});
});
Router.route('/trees/search/:phrase', function() {
	Session.set('treesBackUrl', this.originalUrl);
	this.render('TreeList', {
		data: function() {
			return {
				trees: Trees.find({}).map(function(obj) {
					return new Tree(obj);
				}).sort((function(a, b) {
					var a = a.rank(this.params.phrase);
					var b = b.rank(this.params.phrase);
					if(a > b) {
						return -1;
					} else if (a === b) {
						return 0;
					} else {
						return 1;
					}
				}).bind(this)),
				back: '/trees'
			}
		}
	});
});
Router.route('/trees/tree/:id', function() {
	if(!Session.get('treesBackUrl')) {
		Router.go('/trees');
	}
	this.render('SingleTree', {
		data: function() {
			return {
				tree: Trees.findOne({_id: this.params.id}),
				back: Session.get('treesBackUrl')
			}
		}
	});
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
		this.response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'});
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

