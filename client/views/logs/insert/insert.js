var pageSession = new ReactiveDict();

Template.LogsInsert.onCreated(function() {
	
});

Template.LogsInsert.onDestroyed(function() {
	
});

Template.LogsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LogsInsert.events({
	
});

Template.LogsInsert.helpers({
	
});

Template.LogsInsertInsertForm.onCreated(function() {
	
});

Template.LogsInsertInsertForm.onDestroyed(function() {
	
});

Template.LogsInsertInsertForm.onRendered(function() {
	

	pageSession.set("logsInsertInsertFormInfoMessage", "");
	pageSession.set("logsInsertInsertFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.LogsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("logsInsertInsertFormInfoMessage", "");
		pageSession.set("logsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var logsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(logsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("logsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("logs", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("logsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("logInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("logs", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.LogsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("logsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("logsInsertInsertFormErrorMessage");
	}
	
});
