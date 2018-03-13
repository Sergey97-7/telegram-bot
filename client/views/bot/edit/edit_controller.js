this.BotEditController = RouteController.extend({
	template: "BotEdit",
	

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
			messages: Question.find({}, {sort:[["Id","asc"]]}),
			message_details: Question.findOne({_id:this.params.botId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});