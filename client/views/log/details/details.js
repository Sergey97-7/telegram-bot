var pageSession = new ReactiveDict();

Template.LogDetails.onCreated(function() {
	
});

Template.LogDetails.onDestroyed(function() {
	
});

Template.LogDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LogDetails.events({
	
});

Template.LogDetails.helpers({
	
});

Template.LogDetailsDetailsForm.onCreated(function() {
	
});

Template.LogDetailsDetailsForm.onDestroyed(function() {
	
});

Template.LogDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("logDetailsDetailsFormInfoMessage", "");
	pageSession.set("logDetailsDetailsFormErrorMessage", "");

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

Template.LogDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("logDetailsDetailsFormInfoMessage", "");
		pageSession.set("logDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var logDetailsDetailsFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(logDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("logDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("logDetailsDetailsFormErrorMessage", message);
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

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("log", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("log", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.LogDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("logDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("logDetailsDetailsFormErrorMessage");
	}
	
});
