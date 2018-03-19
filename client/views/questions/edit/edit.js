var pageSession = new ReactiveDict();

Template.QuestionsEdit.onCreated(function() {
	
});

Template.QuestionsEdit.onDestroyed(function() {
	
});

Template.QuestionsEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.QuestionsEdit.events({
	
});

Template.QuestionsEdit.helpers({
	
});

Template.QuestionsEditEditForm.onCreated(function() {
	
});

Template.QuestionsEditEditForm.onDestroyed(function() {
	
});

Template.QuestionsEditEditForm.onRendered(function() {
	

	pageSession.set("questionsEditEditFormInfoMessage", "");
	pageSession.set("questionsEditEditFormErrorMessage", "");

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

Template.QuestionsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("questionsEditEditFormInfoMessage", "");
		pageSession.set("questionsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var questionsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(questionsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("questionsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("questionsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("questionUpdate", t.data.message_details._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.QuestionsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("questionsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("questionsEditEditFormErrorMessage");
	}
	
});
