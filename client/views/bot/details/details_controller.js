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
		var id = this._id;

		var subs = [
			Meteor.subscribe("message_details", id)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		var id = this._id;

		var data = {
			params: this.params || {},
			message_details: Question.findOne({_id:id}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});