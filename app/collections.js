var scope;
try {
	scope = window;
}
catch(e) {
	scope = global;
}

scope.Observations = new Mongo.Collection('observations');
	
