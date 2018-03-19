Meteor.methods({
	"answerInsert": function(data) {
		if(!Answer.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Answer.insert(data);
	},

	"answerUpdate": function(id, data) {
		var doc = Answer.findOne({ _id: id });
		if(!Answer.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Answer.update({ _id: id }, { $set: data });
	},

	"answerRemove": function(id) {
		var doc = Answer.findOne({ _id: id });
		if(!Answer.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Answer.remove({ _id: id });
	}
});
