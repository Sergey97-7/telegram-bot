this.AnswersDetailsController = RouteController.extend({
	template: "AnswersDetails",
	

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
			Meteor.subscribe("answer_details", this.params.answerId)
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
			answer_details: Answer.findOne({_id:this.params.answerId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});