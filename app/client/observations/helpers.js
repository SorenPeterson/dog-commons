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
