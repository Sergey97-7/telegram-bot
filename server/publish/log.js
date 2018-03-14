Meteor.publish("logs", function() {
	return Log.find({}, {});
});

Meteor.publish("log_details", function(logId) {
	return Log.find({_id:logId}, {});
});

