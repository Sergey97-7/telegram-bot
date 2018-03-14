Meteor.publish("tests", function() {
	return Test.find({}, {});
});

Meteor.publish("test_details", function(testId) {
	return Test.find({_id:testId}, {});
});

Meteor.publish("tests_empty", function() {
	return Test.find({_id:null}, {});
});

Meteor.publish("tests_empty_find_one", function() {
	return Test.find({_id:null}, {});
});

Meteor.publish("test_details_find_one", function(testId) {
	return Test.find({_id:testId}, {});
});

