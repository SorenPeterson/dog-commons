if (Meteor.isCordova) {
	GeolocationBG.config({
		// your server url to send locations to
		//   YOU MUST SET THIS TO YOUR SERVER'S URL
		//   (see the setup instructions below)
		url: 'http://192.168.1.131:3000/api/geolocation',
		params: {
			// will be sent in with 'location' in POST data (root level params)
			// these will be added automatically in setup()
			//userId: GeolocationBG.userId(),
			//uuid:   GeolocationBG.uuid(),
			//device: GeolocationBG.device()
		},
		headers: {
			// will be sent in with 'location' in HTTP Header data
		},
		desiredAccuracy: 10,
		stationaryRadius: 20,
		distanceFilter: 30,
			// Android ONLY, customize the title of the notification
		notificationTitle: 'Background GPS',
			// Android ONLY, customize the text of the notification
		notificationText: 'ENABLED',
			//
		activityType: 'AutomotiveNavigation',
			// enable this hear sounds for background-geolocation life-cycle.
		debug: true // 
	});

	//GeolocationBG.start();
}
