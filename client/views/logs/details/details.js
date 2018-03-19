var pageSession = new ReactiveDict();

Template.LogsDetails.onCreated(function() {
	
});

Template.LogsDetails.onDestroyed(function() {
	
});

Template.LogsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LogsDetails.events({
	
});

Template.LogsDetails.helpers({
	
});

Template.LogsDetailsDetailsForm.onCreated(function() {
	
});

Template.LogsDetailsDetailsForm.onDestroyed(function() {
	
});

Template.LogsDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("logsDetailsDetailsFormInfoMessage", "");
	pageSession.set("logsDetailsDetailsFormErrorMessage", "");

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

Template.LogsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("logsDetailsDetailsFormInfoMessage", "");
		pageSession.set("logsDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var logsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(logsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("logsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("logsDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("logs", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("logs", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.LogsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("logsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("logsDetailsDetailsFormErrorMessage");
	}
	
});
