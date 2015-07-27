Meteor._reload.onMigrate(function() {
	return [false];
});

String.prototype.width = function(font) {
	var f = font || '12px arial',
	o = $('<div>' + this + '</div>').css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f}).appendTo($('body')),
	w = o.width();

	o.remove();

	return w;
}

String.prototype.shrink = function(size, font) {
	if(size > this.width())
		return this;
	var count = 0;
	var l = 0;
	var w = 0;
	do {
		l += Math.floor(((size - w) / size) * l) + 1;
		console.log(l);
		w = this.substring(0, l).width(font);
		count += 1;
	} while(w < size && count < 1000);
	return this.substring(0, l);
}

