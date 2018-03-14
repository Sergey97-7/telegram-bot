Meteor.methods({
	"testInsert": function(data) {
		if(!Test.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Test.insert(data);
	},

	"testUpdate": function(id, data) {
		var doc = Test.findOne({ _id: id });
		if(!Test.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Test.update({ _id: id }, { $set: data });
	},

	"testRemove": function(id) {
		var doc = Test.findOne({ _id: id });
		if(!Test.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Test.remove({ _id: id });
	}
});
