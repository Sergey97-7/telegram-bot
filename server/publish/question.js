Meteor.publish("messages", function() {
	return Question.find({}, {});
});

Meteor.publish("messages_empty", function() {
	return Question.find({_id:null}, {});
});

Meteor.publish("messages_details", function(botId) {
	return Question.find({_id:botId}, {});
});

