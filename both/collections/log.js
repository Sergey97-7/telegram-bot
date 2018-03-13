this.Log = new Mongo.Collection("log");

this.Log.userCanInsert = function(userId, doc) {
	return true;
};

this.Log.userCanUpdate = function(userId, doc) {
	return true;
};

this.Log.userCanRemove = function(userId, doc) {
	return true;
};
