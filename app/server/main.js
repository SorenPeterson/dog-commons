Meteor.startup(function() {
	global.Future = Npm.require('fibers/future');
});

Meteor.methods({
	facebook_feed: function() {
		var fut = new Future();

		var url = 'https://graph.facebook.com/oauth/access_token?client_id=' + process.env.FB_APP_ID + '&client_secret=' + process.env.FB_APP_SECRET + '&grant_type=client_credentials'
		HTTP.get(url, {}, function(notreallysurewhatthisis, response) {
			console.log(response.content);
			HTTP.get('https://graph.facebook.com/MnArboretum/posts?' + response.content, function(dogeroni, response) {
				fut.return(response.content);
			});
		});
		
		return fut.wait();
	}
});
