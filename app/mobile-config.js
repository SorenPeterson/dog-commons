App.info({
	name: '3030 - Nature Based Therapy',
	description: 'Minnesota Landscape Arboretum',
	version: '0.0.4'
});

App.icons({
	'iphone': 'icons/icon-57.png'
});

App.accessRule('*.otterhive.com/*');
App.accessRule('192.168.1.131/*');
App.accessRule('localhost/*');
App.accessRule('*.meteor.com/*');
App.accessRule('*.mapbox.com/*');

