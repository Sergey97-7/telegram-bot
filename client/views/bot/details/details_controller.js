this.BotDetailsController = RouteController.extend({
	template: "BotDetails",
	

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
		var BotId = this._id;

		var subs = [
			Meteor.subscribe("messages_details", BotId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		var BotId = this._id;

		var data = {
			params: this.params || {},
			messages_details: Question.findOne({_id:BotId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});