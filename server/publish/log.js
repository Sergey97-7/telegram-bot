Meteor.publish("logs", function() {
	return Log.find({}, {});
});

Meteor.publish("log_details", function(logId) {
	return Log.find({_id:logId}, {});
});

Meteor.publish("log_empty", function() {
	return Log.find({_id:null}, {});
});

Meteor.publish("log_empty_find_one", function() {
	return Log.find({_id:null}, {});
});

