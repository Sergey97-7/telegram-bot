var pageSession = new ReactiveDict();

Template.QuestionsDetails.onCreated(function() {
	
});

Template.QuestionsDetails.onDestroyed(function() {
	
});

Template.QuestionsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.QuestionsDetails.events({
	
});

Template.QuestionsDetails.helpers({
	
});

Template.QuestionsDetailsDetailsForm.onCreated(function() {
	
});

Template.QuestionsDetailsDetailsForm.onDestroyed(function() {
	
});

Template.QuestionsDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("questionsDetailsDetailsFormInfoMessage", "");
	pageSession.set("questionsDetailsDetailsFormErrorMessage", "");

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

Template.QuestionsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("questionsDetailsDetailsFormInfoMessage", "");
		pageSession.set("questionsDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var questionsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(questionsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("questionsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("questionsDetailsDetailsFormErrorMessage", message);
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

		Router.go("questions", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("questions", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.QuestionsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("questionsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("questionsDetailsDetailsFormErrorMessage");
	}
	
});
