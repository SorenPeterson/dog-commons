App.info({
	name: 'Dog Commons',
	description: 'Minnesota Landscape Arboretum',
	version: '1.0.0'
});

App.icons({
	'iphone_2x': 'icons/icon-120.png',
	'iphone_3x': 'icons/icon-180.png',
	'ipad': 'icons/icon-76.png',
	'ipad_2x': 'icons/icon-152.png',
	'android_mdpi': 'icons/icon-48.png',
	'android_hdpi': 'icons/icon-72.png',
	'android_xhdpi': 'icons/icon-96.png',
});

App.launchScreens({
	// iOS
	'iphone_2x': 'icons/iphone/Default@2x.png',
	'iphone5': 'icons/iphone/Default-568h@2x.png',
	'iphone6': 'icons/iphone/Default-667h@2x.png',
	'iphone6p_portrait': 'icons/iphone/Default-Portrait-736h@3x.png',

	'ipad_portrait': 'icons/iphone/Default-Portrait.png',
	'ipad_portrait_2x': 'icons/iphone/Default-Portrait@2x.png',

	// Android
	'android_mdpi_portrait': 'icons/android/mdpi.png',
	'android_hdpi_portrait': 'icons/android/hdpi.png',
	'android_xhdpi_portrait': 'icons/android/xhdpi.png'
});

/*App.accessRule('nbt.otterhive.com/*');
  App.accessRule('192.168.1.131/*');
  App.accessRule('localhost/*');
  App.accessRule('*.mapbox.com/*');
  App.accessRule('*.audubon.org/*');*/
App.accessRule('*');

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarStyle', 'default');
