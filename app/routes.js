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

Router.route('/trees/Coniferous');
Router.route('/trees/Deciduous');
Router.route('/trees/Needle');
Router.route('/trees/NotNeedle');
Router.route('/trees/SingleNeedle');
Router.route('/trees/GroupedNeedle');
Router.route('/trees/ClusteredNeedle');
Router.route('/trees/FlatNeedle');
Router.route('/trees/AngledNeedle');
Router.route('/trees/AlternateBranching');
Router.route('/trees/OppositeBranching');
Router.route('/trees/AlternateBranchingSimpleLeaf');
Router.route('/trees/AlternateBranchingCompoundLeaf');
Router.route('/trees/SimpleLobedLeaf');
Router.route('/trees/SimpleNonLobedLeaf');
Router.route('/trees/Thorns');
Router.route('/trees/PaperyBark');
Router.route('/trees/FlattenedStems');
Router.route('/trees/Other');
Router.route('/trees/PlatedPith');
Router.route('/trees/NotPlatedPith');
Router.route('/trees/OppositeBranchingSimpleLeaf');
Router.route('/trees/OppositeBranchingCompoundLeaf');
Router.route('/trees/SmoothOutline');
Router.route('/trees/ToothedOutline');

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

