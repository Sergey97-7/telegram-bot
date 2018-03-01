Meteor.methods({
	"questionInsert": function(data) {
		if(!Question.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Question.insert(data);
	},

	"questionUpdate": function(id, data) {
		var doc = Question.findOne({ _id: id });
		if(!Question.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Question.update({ _id: id }, { $set: data });
	},

	"questionRemove": function(id) {
		var doc = Question.findOne({ _id: id });
		if(!Question.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Question.remove({ _id: id });
	}
});
