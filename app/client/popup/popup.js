var Popup = function(id) {
	this.close = function() {
	};
	this.hideForever = function() {
	};
};

Template.Popup.onRendered(function() {
	var $elem = $(this.find('#popup-msg-content'));
	var desiredHeight = innerHeight * 0.6;
	var size = 0.9;
	do {
		size += 0.1;
		var currentHeight = $elem.height();
		$elem.css('font-size', size + 'em');
	} while(currentHeight < desiredHeight && size < 1.6)
});

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
