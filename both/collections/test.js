this.Test = new Mongo.Collection("test");

this.Test.userCanInsert = function(userId, doc) {
	return true;
};

this.Test.userCanUpdate = function(userId, doc) {
	return true;
};

this.Test.userCanRemove = function(userId, doc) {
	return true;
};
