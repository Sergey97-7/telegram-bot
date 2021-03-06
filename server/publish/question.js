Meteor.publish("messages", function() {
	return Question.publishJoinedCursors(Question.find({}, {}));
});

Meteor.publish("messages_empty", function() {
	return Question.publishJoinedCursors(Question.find({_id:null}, {}));
});

Meteor.publish("message_details", function(botId) {
	return Question.publishJoinedCursors(Question.find({_id:botId}, {}));
});

