var pageSession = new ReactiveDict();

Template.Answers.onCreated(function() {
	
});

Template.Answers.onDestroyed(function() {
	
});

Template.Answers.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Answers.events({
	
});

Template.Answers.helpers({
	
});

var AnswersAnswerViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AnswersAnswerViewSearchString");
	var sortBy = pageSession.get("AnswersAnswerViewSortBy");
	var sortAscending = pageSession.get("AnswersAnswerViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["answer_type", "answer_var", "questionId", "question.bot_msg"];
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

var AnswersAnswerViewExport = function(cursor, fileType) {
	var data = AnswersAnswerViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.AnswersAnswerView.onCreated(function() {
	
});

Template.AnswersAnswerView.onDestroyed(function() {
	
});

Template.AnswersAnswerView.onRendered(function() {
	pageSession.set("AnswersAnswerViewStyle", "table");
	
});

Template.AnswersAnswerView.events({
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
				pageSession.set("AnswersAnswerViewSearchString", searchString);
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
					pageSession.set("AnswersAnswerViewSearchString", searchString);
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
					pageSession.set("AnswersAnswerViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("answers.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AnswersAnswerViewExport(this.answers, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AnswersAnswerViewExport(this.answers, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AnswersAnswerViewExport(this.answers, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AnswersAnswerViewExport(this.answers, "json");
	}

	
});

Template.AnswersAnswerView.helpers({

	"insertButtonClass": function() {
		return Answer.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.answers || this.answers.count() == 0;
	},
	"isNotEmpty": function() {
		return this.answers && this.answers.count() > 0;
	},
	"isNotFound": function() {
		return this.answers && pageSession.get("AnswersAnswerViewSearchString") && AnswersAnswerViewItems(this.answers).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AnswersAnswerViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AnswersAnswerViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("AnswersAnswerViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("AnswersAnswerViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AnswersAnswerViewStyle") == "gallery";
	}

	
});


Template.AnswersAnswerViewTable.onCreated(function() {
	
});

Template.AnswersAnswerViewTable.onDestroyed(function() {
	
});

Template.AnswersAnswerViewTable.onRendered(function() {
	
});

Template.AnswersAnswerViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AnswersAnswerViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AnswersAnswerViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AnswersAnswerViewSortAscending") || false;
			pageSession.set("AnswersAnswerViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AnswersAnswerViewSortAscending", true);
		}
	}
});

Template.AnswersAnswerViewTable.helpers({
	"tableItems": function() {
		return AnswersAnswerViewItems(this.answers);
	}
});


Template.AnswersAnswerViewTableItems.onCreated(function() {
	
});

Template.AnswersAnswerViewTableItems.onDestroyed(function() {
	
});

Template.AnswersAnswerViewTableItems.onRendered(function() {
	
});

Template.AnswersAnswerViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("answers.details", mergeObjects(Router.currentRouteParams(), {answerId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("answerUpdate", this._id, values, function(err, res) {
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
						Meteor.call("answerRemove", me._id, function(err, res) {
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
		Router.go("answers.edit", mergeObjects(Router.currentRouteParams(), {answerId: this._id}));
		return false;
	}
});

Template.AnswersAnswerViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Answer.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Answer.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
