var Popup = function(id) {
	this.close = function() {
	};
	this.hideForever = function() {
	};
};

Template.Popup.helpers({
	hidden: function() {
		return Session.get('hide-popup-msg-' + this.id);
	}
});

Template.Popup.events({
	'click .button.close': function(evt, tmpl) {
		Session.set('hide-popup-msg-' + tmpl.data.id, true);
	},
	'click .button.dontShow': function(evt, tmpl) {
		Session.setPersistent('hide-popup-msg-' + tmpl.data.id, true);
	}
});
