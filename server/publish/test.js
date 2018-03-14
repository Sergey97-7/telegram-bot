Meteor.publish("tests", function() {
	return Test.publishJoinedCursors(Test.find({}, {}));
});

Meteor.publish("test_details", function(testId) {
	return Test.publishJoinedCursors(Test.find({_id:testId}, {}));
});

Meteor.publish("tests_empty", function() {
	return Test.publishJoinedCursors(Test.find({_id:null}, {}));
});

