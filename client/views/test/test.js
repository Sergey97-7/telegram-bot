var pageSession = new ReactiveDict();

Template.Test.onCreated(function() {
	
});

Template.Test.onDestroyed(function() {
	
});

Template.Test.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Test.events({
	
});

Template.Test.helpers({
	
});

var TestTestViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TestTestViewSearchString");
	var sortBy = pageSession.get("TestTestViewSortBy");
	var sortAscending = pageSession.get("TestTestViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["id", "string"];
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

var TestTestViewExport = function(cursor, fileType) {
	var data = TestTestViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.TestTestView.onCreated(function() {
	
});

Template.TestTestView.onDestroyed(function() {
	
});

Template.TestTestView.onRendered(function() {
	pageSession.set("TestTestViewStyle", "table");
	
});

Template.TestTestView.events({
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
				pageSession.set("TestTestViewSearchString", searchString);
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
					pageSession.set("TestTestViewSearchString", searchString);
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
					pageSession.set("TestTestViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("test.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		TestTestViewExport(this.tests, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TestTestViewExport(this.tests, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TestTestViewExport(this.tests, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TestTestViewExport(this.tests, "json");
	}

	
});

Template.TestTestView.helpers({

	"insertButtonClass": function() {
		return Test.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.tests || this.tests.count() == 0;
	},
	"isNotEmpty": function() {
		return this.tests && this.tests.count() > 0;
	},
	"isNotFound": function() {
		return this.tests && pageSession.get("TestTestViewSearchString") && TestTestViewItems(this.tests).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TestTestViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TestTestViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("TestTestViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("TestTestViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TestTestViewStyle") == "gallery";
	}

	
});


Template.TestTestViewTable.onCreated(function() {
	
});

Template.TestTestViewTable.onDestroyed(function() {
	
});

Template.TestTestViewTable.onRendered(function() {
	
});

Template.TestTestViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("TestTestViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TestTestViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TestTestViewSortAscending") || false;
			pageSession.set("TestTestViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TestTestViewSortAscending", true);
		}
	}
});

Template.TestTestViewTable.helpers({
	"tableItems": function() {
		return TestTestViewItems(this.tests);
	}
});


Template.TestTestViewTableItems.onCreated(function() {
	
});

Template.TestTestViewTableItems.onDestroyed(function() {
	
});

Template.TestTestViewTableItems.onRendered(function() {
	
});

Template.TestTestViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("test.details", mergeObjects(Router.currentRouteParams(), {testId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("testUpdate", this._id, values, function(err, res) {
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
						Meteor.call("testRemove", me._id, function(err, res) {
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
		Router.go("test.edit", mergeObjects(Router.currentRouteParams(), {testId: this._id}));
		return false;
	}
});

Template.TestTestViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Test.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Test.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
