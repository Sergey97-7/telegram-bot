var pageSession = new ReactiveDict();

Template.Logs.onCreated(function() {
	
});

Template.Logs.onDestroyed(function() {
	
});

Template.Logs.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Logs.events({
	
});

Template.Logs.helpers({
	
});

var LogsLogViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("LogsLogViewSearchString");
	var sortBy = pageSession.get("LogsLogViewSortBy");
	var sortAscending = pageSession.get("LogsLogViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["user_id", "user_name", "last_question", "last_answer", "time"];
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

var LogsLogViewExport = function(cursor, fileType) {
	var data = LogsLogViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.LogsLogView.onCreated(function() {
	
});

Template.LogsLogView.onDestroyed(function() {
	
});

Template.LogsLogView.onRendered(function() {
	pageSession.set("LogsLogViewStyle", "table");
	
});

Template.LogsLogView.events({
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
				pageSession.set("LogsLogViewSearchString", searchString);
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
					pageSession.set("LogsLogViewSearchString", searchString);
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
					pageSession.set("LogsLogViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("logs.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		LogsLogViewExport(this.logs, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		LogsLogViewExport(this.logs, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		LogsLogViewExport(this.logs, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		LogsLogViewExport(this.logs, "json");
	}

	
});

Template.LogsLogView.helpers({

	"insertButtonClass": function() {
		return Log.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.logs || this.logs.count() == 0;
	},
	"isNotEmpty": function() {
		return this.logs && this.logs.count() > 0;
	},
	"isNotFound": function() {
		return this.logs && pageSession.get("LogsLogViewSearchString") && LogsLogViewItems(this.logs).length == 0;
	},
	"searchString": function() {
		return pageSession.get("LogsLogViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("LogsLogViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("LogsLogViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("LogsLogViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("LogsLogViewStyle") == "gallery";
	}

	
});


Template.LogsLogViewTable.onCreated(function() {
	
});

Template.LogsLogViewTable.onDestroyed(function() {
	
});

Template.LogsLogViewTable.onRendered(function() {
	
});

Template.LogsLogViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("LogsLogViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("LogsLogViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("LogsLogViewSortAscending") || false;
			pageSession.set("LogsLogViewSortAscending", !sortAscending);
		} else {
			pageSession.set("LogsLogViewSortAscending", true);
		}
	}
});

Template.LogsLogViewTable.helpers({
	"tableItems": function() {
		return LogsLogViewItems(this.logs);
	}
});


Template.LogsLogViewTableItems.onCreated(function() {
	
});

Template.LogsLogViewTableItems.onDestroyed(function() {
	
});

Template.LogsLogViewTableItems.onRendered(function() {
	
});

Template.LogsLogViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("logs.details", mergeObjects(Router.currentRouteParams(), {logId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("logUpdate", this._id, values, function(err, res) {
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
						Meteor.call("logRemove", me._id, function(err, res) {
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
		Router.go("logs.edit", mergeObjects(Router.currentRouteParams(), {logId: this._id}));
		return false;
	}
});

Template.LogsLogViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Log.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Log.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
