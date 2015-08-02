Template.Mla.events({
	'click a': function(evt, tmpl) {
		var href = $(evt.target).closest('a').attr('href');
		if(href !== '/home') {
			evt.preventDefault();
			window.open(href, '_blank', 'location=yes');
		}
	}
});

