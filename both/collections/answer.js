this.Answer = new Mongo.Collection("answer");

this.Answer.userCanInsert = function(userId, doc) {
	return true;
};

this.Answer.userCanUpdate = function(userId, doc) {
	return true;
};

this.Answer.userCanRemove = function(userId, doc) {
	return true;
};
