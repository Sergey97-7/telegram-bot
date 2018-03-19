var pageSession = new ReactiveDict();

Template.LogsEdit.onCreated(function() {
	
});

Template.LogsEdit.onDestroyed(function() {
	
});

Template.LogsEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LogsEdit.events({
	
});

Template.LogsEdit.helpers({
	
});

Template.LogsEditEditForm.onCreated(function() {
	
});

Template.LogsEditEditForm.onDestroyed(function() {
	
});

Template.LogsEditEditForm.onRendered(function() {
	

	pageSession.set("logsEditEditFormInfoMessage", "");
	pageSession.set("logsEditEditFormErrorMessage", "");

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

Template.LogsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("logsEditEditFormInfoMessage", "");
		pageSession.set("logsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var logsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(logsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("logsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("logs", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("logsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("logUpdate", t.data.log_details._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.LogsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("logsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("logsEditEditFormErrorMessage");
	}
	
});
