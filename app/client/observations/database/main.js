window.DataBase = (function() {
	var today = function() {
		return moment(new Date).format('YYYYMMDD');
	};

	var save = function(obj) {
		Session.setPermanent('nbtappdb', obj);
	}

	var fromDB = function() {
		return Session.get('nbtappdb') || {};
	}

	var todaysObservations = function() {
		return fromDB()[today()] || [];
	};

	var insert = function(obs) {
		var dbObj = fromDB();
		var today = today();
		dbObj[today] = dbObj[today] || [];
		dbObj[today].push(obs);
		save(dbObj);
	};

	var remove = function() {
	};

	return {
		todaysObservations: todaysObservations,
		insert: insert,
		remove: remove
	};
})();

