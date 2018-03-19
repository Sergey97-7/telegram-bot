var pageSession = new ReactiveDict();

Template.AnswersDetails.onCreated(function() {
	
});

Template.AnswersDetails.onDestroyed(function() {
	
});

Template.AnswersDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AnswersDetails.events({
	
});

Template.AnswersDetails.helpers({
	
});

Template.AnswersDetailsDetailsAnswer.onCreated(function() {
	
});

Template.AnswersDetailsDetailsAnswer.onDestroyed(function() {
	
});

Template.AnswersDetailsDetailsAnswer.onRendered(function() {
	

	pageSession.set("answersDetailsDetailsAnswerInfoMessage", "");
	pageSession.set("answersDetailsDetailsAnswerErrorMessage", "");

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

Template.AnswersDetailsDetailsAnswer.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("answersDetailsDetailsAnswerInfoMessage", "");
		pageSession.set("answersDetailsDetailsAnswerErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var answersDetailsDetailsAnswerMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(answersDetailsDetailsAnswerMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("answersDetailsDetailsAnswerInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("answersDetailsDetailsAnswerErrorMessage", message);
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

		Router.go("answers", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("answers", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.AnswersDetailsDetailsAnswer.helpers({
	"infoMessage": function() {
		return pageSession.get("answersDetailsDetailsAnswerInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("answersDetailsDetailsAnswerErrorMessage");
	}
	
});
