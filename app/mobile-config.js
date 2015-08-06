App.info({
	name: '3030 - Nature Based Therapy',
	description: 'Minnesota Landscape Arboretum',
	version: '0.1.0'
});

App.icons({
	'iphone': 'icons/icon-57.png',
	'iphone_2x': 'icons/icon-120.png',
	'iphone_3x': 'icons/icon-180.png',
	'ipad': 'icons/icon-76.png',
	'ipad_2x': 'icons/icon-152.png',
	'android_ldpi': 'icons/icon-36.png',
	'android_mdpi': 'icons/icon-48.png',
	'android_hdpi': 'icons/icon-72.png',
	'android_xhdpi': 'icons/icon-96.png',
});

/*App.accessRule('nbt.otterhive.com/*');
App.accessRule('192.168.1.131/*');
App.accessRule('localhost/*');
App.accessRule('*.mapbox.com/*');
App.accessRule('*.audubon.org/*');*/
App.accessRule('*');

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarStyle', 'default');

