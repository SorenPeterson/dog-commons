Template.Mla.events({
	'click a': function(evt, tmpl) {
		evt.preventDefault();
		var href = $(evt.target).closest('a').attr('href');
		window.open(href, '_blank', 'location=yes');
	}
});

