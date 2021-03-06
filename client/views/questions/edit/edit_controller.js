this.QuestionsEditController = RouteController.extend({
	template: "QuestionsEdit",
	

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
			Meteor.subscribe("answers"),
			Meteor.subscribe("message_details", this.params.botId)
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
			answers: Answer.find({}, {}),
			message_details: Question.findOne({_id:this.params.botId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});