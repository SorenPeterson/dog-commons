var today = function() {
	return moment(new Date).format('YYYYMMDD');
}

Template.Observations.helpers({
	observations: function() {
		return Observations.find({date: today()});
	}
});

Template.Observations.events({
	'submit form': function(e, tmpl) {
		e.preventDefault();
		var textArea = tmpl.find('textarea');
		if(textArea.value !== '') {
			if(Observations.find({date: today()}).count() < 3) {
				Observations.insert({date: today(), content: textArea.value });
			} else {
				alert('no more today');
			}
			textArea.value = '';
		}
	},
	'click .delete': function(e, tmpl) {
		Observations.remove({_id: e.target.dataset.id});
	}
});

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

