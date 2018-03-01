var pageSession = new ReactiveDict();

Template.BotDetails.onCreated(function() {
	
});

Template.BotDetails.onDestroyed(function() {
	
});

Template.BotDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BotDetails.events({
	
});

Template.BotDetails.helpers({
	
});

Template.BotDetailsDetailsForm.onCreated(function() {
	
});

Template.BotDetailsDetailsForm.onDestroyed(function() {
	
});

Template.BotDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("botDetailsDetailsFormInfoMessage", "");
	pageSession.set("botDetailsDetailsFormErrorMessage", "");

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

Template.BotDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("botDetailsDetailsFormInfoMessage", "");
		pageSession.set("botDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var botDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(botDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("botDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("botDetailsDetailsFormErrorMessage", message);
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

		Router.go("bot", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("bot", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.BotDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("botDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("botDetailsDetailsFormErrorMessage");
	}
	
});
