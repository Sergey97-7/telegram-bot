Meteor.publish("answers", function() {
	return Answer.publishJoinedCursors(Answer.find({}, {}));
});

Meteor.publish("answer_details", function(answerId) {
	return Answer.publishJoinedCursors(Answer.find({_id:answerId}, {}));
});

Meteor.publish("answer_empty", function() {
	return Answer.publishJoinedCursors(Answer.find({_id:null}, {}));
});

