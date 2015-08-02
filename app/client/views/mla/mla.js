Router.route('/mla', function() {
	Session.set('pageTitle', 'Information');
	this.render('MLA');
});

Template.MLA.events({
	'click a': function(evt, tmpl) {
		evt.preventDefault();
		var href = evt.target.closest('a').href;
		window.open(href, '_blank', 'location=yes');
	}
});

