this.Question = new Mongo.Collection("question");

this.Question.userCanInsert = function(userId, doc) {
	return true;
};

this.Question.userCanUpdate = function(userId, doc) {
	return true;
};

this.Question.userCanRemove = function(userId, doc) {
	return true;
};
