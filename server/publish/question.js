Meteor.publish("messages", function() {
	return Question.find({}, {sort:[["Id","asc"]]});
});

Meteor.publish("messages_empty", function() {
	return Question.find({_id:null}, {});
});

Meteor.publish("message_details", function(botId) {
	return Question.find({_id:botId}, {});
});

