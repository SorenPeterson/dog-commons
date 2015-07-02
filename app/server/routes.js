Router.route('/api/geolocation', function() {
		// GET, POST, PUT, DELETE
		var requestMethod = this.request.method;
		// Data from a POST request
		var requestData = this.request.body;

		// log stuff
		//console.log('GeolocationBG post: ' + requestMethod);
		//console.log(JSON.stringify(requestData));

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

