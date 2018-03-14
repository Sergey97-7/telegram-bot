this.TestEditController = RouteController.extend({
	template: "TestEdit",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("messages"),
			Meteor.subscribe("test_details", this.params.testId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			messages: Question.find({}, {sort:[["bot_msg"]]}),
			test_details: Test.findOne({_id:this.params.testId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});