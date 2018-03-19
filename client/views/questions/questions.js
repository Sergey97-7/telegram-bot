var pageSession = new ReactiveDict();

Template.Questions.onCreated(function() {
	
});

Template.Questions.onDestroyed(function() {
	
});

Template.Questions.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Questions.events({
	
});

Template.Questions.helpers({
	
});

var QuestionsNewDataViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("QuestionsNewDataViewSearchString");
	var sortBy = pageSession.get("QuestionsNewDataViewSortBy");
	var sortAscending = pageSession.get("QuestionsNewDataViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["bot_msg", "first_question", "last_question"];
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

var QuestionsNewDataViewExport = function(cursor, fileType) {
	var data = QuestionsNewDataViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.QuestionsNewDataView.onCreated(function() {
	
});

Template.QuestionsNewDataView.onDestroyed(function() {
	
});

Template.QuestionsNewDataView.onRendered(function() {
	pageSession.set("QuestionsNewDataViewStyle", "table");
	
});

Template.QuestionsNewDataView.events({
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
				pageSession.set("QuestionsNewDataViewSearchString", searchString);
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
					pageSession.set("QuestionsNewDataViewSearchString", searchString);
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
					pageSession.set("QuestionsNewDataViewSearchString", "");
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
		QuestionsNewDataViewExport(this.messages, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		QuestionsNewDataViewExport(this.messages, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		QuestionsNewDataViewExport(this.messages, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		QuestionsNewDataViewExport(this.messages, "json");
	}

	
});

Template.QuestionsNewDataView.helpers({

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
		return this.messages && pageSession.get("QuestionsNewDataViewSearchString") && QuestionsNewDataViewItems(this.messages).length == 0;
	},
	"searchString": function() {
		return pageSession.get("QuestionsNewDataViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("QuestionsNewDataViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("QuestionsNewDataViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("QuestionsNewDataViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("QuestionsNewDataViewStyle") == "gallery";
	}

	
});


Template.QuestionsNewDataViewTable.onCreated(function() {
	
});

Template.QuestionsNewDataViewTable.onDestroyed(function() {
	
});

Template.QuestionsNewDataViewTable.onRendered(function() {
	
});

Template.QuestionsNewDataViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("QuestionsNewDataViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("QuestionsNewDataViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("QuestionsNewDataViewSortAscending") || false;
			pageSession.set("QuestionsNewDataViewSortAscending", !sortAscending);
		} else {
			pageSession.set("QuestionsNewDataViewSortAscending", true);
		}
	}
});

Template.QuestionsNewDataViewTable.helpers({
	"tableItems": function() {
		return QuestionsNewDataViewItems(this.messages);
	}
});


Template.QuestionsNewDataViewTableItems.onCreated(function() {
	
});

Template.QuestionsNewDataViewTableItems.onDestroyed(function() {
	
});

Template.QuestionsNewDataViewTableItems.onRendered(function() {
	
});

Template.QuestionsNewDataViewTableItems.events({
	

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

Template.QuestionsNewDataViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Question.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Question.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
