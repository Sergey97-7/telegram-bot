var pageSession = new ReactiveDict();

Template.Bot.onCreated(function() {
	
});

Template.Bot.onDestroyed(function() {
	
});

Template.Bot.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Bot.events({
	
});

Template.Bot.helpers({
	
});

var BotNewDataViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("BotNewDataViewSearchString");
	var sortBy = pageSession.get("BotNewDataViewSortBy");
	var sortAscending = pageSession.get("BotNewDataViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["Id", "bot_msg", "answer_type", "answer_var", "first_question", "ques", "question.Id"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var BotNewDataViewExport = function(cursor, fileType) {
	var data = BotNewDataViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.BotNewDataView.onCreated(function() {
	
});

Template.BotNewDataView.onDestroyed(function() {
	
});

Template.BotNewDataView.onRendered(function() {
	pageSession.set("BotNewDataViewStyle", "table");
	
});

Template.BotNewDataView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("BotNewDataViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("BotNewDataViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("BotNewDataViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("bot.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		BotNewDataViewExport(this.messages, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BotNewDataViewExport(this.messages, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BotNewDataViewExport(this.messages, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BotNewDataViewExport(this.messages, "json");
	}

	
});

Template.BotNewDataView.helpers({

	"insertButtonClass": function() {
		return Question.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.messages || this.messages.count() == 0;
	},
	"isNotEmpty": function() {
		return this.messages && this.messages.count() > 0;
	},
	"isNotFound": function() {
		return this.messages && pageSession.get("BotNewDataViewSearchString") && BotNewDataViewItems(this.messages).length == 0;
	},
	"searchString": function() {
		return pageSession.get("BotNewDataViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("BotNewDataViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("BotNewDataViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("BotNewDataViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("BotNewDataViewStyle") == "gallery";
	}

	
});


Template.BotNewDataViewTable.onCreated(function() {
	
});

Template.BotNewDataViewTable.onDestroyed(function() {
	
});

Template.BotNewDataViewTable.onRendered(function() {
	
});

Template.BotNewDataViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("BotNewDataViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("BotNewDataViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("BotNewDataViewSortAscending") || false;
			pageSession.set("BotNewDataViewSortAscending", !sortAscending);
		} else {
			pageSession.set("BotNewDataViewSortAscending", true);
		}
	}
});

Template.BotNewDataViewTable.helpers({
	"tableItems": function() {
		return BotNewDataViewItems(this.messages);
	}
});


Template.BotNewDataViewTableItems.onCreated(function() {
	
});

Template.BotNewDataViewTableItems.onDestroyed(function() {
	
});

Template.BotNewDataViewTableItems.onRendered(function() {
	
});

Template.BotNewDataViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("bot.details", mergeObjects(Router.currentRouteParams(), {botId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("questionUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("questionRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("bot.edit", mergeObjects(Router.currentRouteParams(), {botId: this._id}));
		return false;
	}
});

Template.BotNewDataViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Question.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Question.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
