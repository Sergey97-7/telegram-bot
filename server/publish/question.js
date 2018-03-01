Meteor.publish("messages", function() {
	return Question.find({}, {});
});

Meteor.publish("messages_empty", function() {
	return Question.find({_id:null}, {});
});

Meteor.publish("message_details", function(id) {
	return Question.find({_id:id}, {});
});

