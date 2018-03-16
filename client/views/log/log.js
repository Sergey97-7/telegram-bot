var pageSession = new ReactiveDict();

Template.Log.onCreated(function() {
	
});

Template.Log.onDestroyed(function() {
	
});

Template.Log.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Log.events({
	
});

Template.Log.helpers({
	
});

var LogLogViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("LogLogViewSearchString");
	var sortBy = pageSession.get("LogLogViewSortBy");
	var sortAscending = pageSession.get("LogLogViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["chat_id", "user_name", "last_question", "last_answer", "time", "test"];
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

var LogLogViewExport = function(cursor, fileType) {
	var data = LogLogViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.LogLogView.onCreated(function() {
	
});

Template.LogLogView.onDestroyed(function() {
	
});

Template.LogLogView.onRendered(function() {
	pageSession.set("LogLogViewStyle", "table");
	
});

Template.LogLogView.events({
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
				pageSession.set("LogLogViewSearchString", searchString);
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
					pageSession.set("LogLogViewSearchString", searchString);
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
					pageSession.set("LogLogViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		LogLogViewExport(this.logs, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		LogLogViewExport(this.logs, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		LogLogViewExport(this.logs, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		LogLogViewExport(this.logs, "json");
	}

	
});

Template.LogLogView.helpers({

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
		return this.logs && pageSession.get("LogLogViewSearchString") && LogLogViewItems(this.logs).length == 0;
	},
	"searchString": function() {
		return pageSession.get("LogLogViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("LogLogViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("LogLogViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("LogLogViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("LogLogViewStyle") == "gallery";
	}

	
});


Template.LogLogViewTable.onCreated(function() {
	
});

Template.LogLogViewTable.onDestroyed(function() {
	
});

Template.LogLogViewTable.onRendered(function() {
	
});

Template.LogLogViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("LogLogViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("LogLogViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("LogLogViewSortAscending") || false;
			pageSession.set("LogLogViewSortAscending", !sortAscending);
		} else {
			pageSession.set("LogLogViewSortAscending", true);
		}
	}
});

Template.LogLogViewTable.helpers({
	"tableItems": function() {
		return LogLogViewItems(this.logs);
	}
});


Template.LogLogViewTableItems.onCreated(function() {
	
});

Template.LogLogViewTableItems.onDestroyed(function() {
	
});

Template.LogLogViewTableItems.onRendered(function() {
	
});

Template.LogLogViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("log.details", mergeObjects(Router.currentRouteParams(), {logId: this._id}));
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
		Router.go("log.edit", mergeObjects(Router.currentRouteParams(), {logId: this._id}));
		return false;
	}
});

Template.LogLogViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Log.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Log.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
