Router.route('/mla', function() {
	Session.set('pageTitle', 'MLA Info');
	this.render('MLA');
});
