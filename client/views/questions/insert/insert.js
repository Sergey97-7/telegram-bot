var pageSession = new ReactiveDict();

Template.QuestionsInsert.onCreated(function() {
	
});

Template.QuestionsInsert.onDestroyed(function() {
	
});

Template.QuestionsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.QuestionsInsert.events({
	
});

Template.QuestionsInsert.helpers({
	
});

Template.QuestionsInsertInsertForm.onCreated(function() {
	
});

Template.QuestionsInsertInsertForm.onDestroyed(function() {
	
});

Template.QuestionsInsertInsertForm.onRendered(function() {
	

	pageSession.set("questionsInsertInsertFormInfoMessage", "");
	pageSession.set("questionsInsertInsertFormErrorMessage", "");

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

Template.QuestionsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("questionsInsertInsertFormInfoMessage", "");
		pageSession.set("questionsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var questionsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(questionsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("questionsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("questions", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("questionsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("questionInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("questions", mergeObjects(Router.currentRouteParams(), {}));
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

Template.QuestionsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("questionsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("questionsInsertInsertFormErrorMessage");
	}
	
});
