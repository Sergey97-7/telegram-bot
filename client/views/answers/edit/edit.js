var pageSession = new ReactiveDict();

Template.AnswersEdit.onCreated(function() {
	
});

Template.AnswersEdit.onDestroyed(function() {
	
});

Template.AnswersEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AnswersEdit.events({
	
});

Template.AnswersEdit.helpers({
	
});

Template.AnswersEditEditAnswer.onCreated(function() {
	
});

Template.AnswersEditEditAnswer.onDestroyed(function() {
	
});

Template.AnswersEditEditAnswer.onRendered(function() {
	

	pageSession.set("answersEditEditAnswerInfoMessage", "");
	pageSession.set("answersEditEditAnswerErrorMessage", "");

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

Template.AnswersEditEditAnswer.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("answersEditEditAnswerInfoMessage", "");
		pageSession.set("answersEditEditAnswerErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var answersEditEditAnswerMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(answersEditEditAnswerMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("answersEditEditAnswerInfoMessage", message);
					}; break;
				}
			}

			Router.go("answers", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("answersEditEditAnswerErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("answerUpdate", t.data.answer_details._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("answers", mergeObjects(Router.currentRouteParams(), {}));
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

Template.AnswersEditEditAnswer.helpers({
	"infoMessage": function() {
		return pageSession.get("answersEditEditAnswerInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("answersEditEditAnswerErrorMessage");
	}
	
});
