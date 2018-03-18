var pageSession = new ReactiveDict();

Template.LogInsert.onCreated(function() {
	
});

Template.LogInsert.onDestroyed(function() {
	
});

Template.LogInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LogInsert.events({
	
});

Template.LogInsert.helpers({
	
});

Template.LogInsertInsertForm.onCreated(function() {
	
});

Template.LogInsertInsertForm.onDestroyed(function() {
	
});

Template.LogInsertInsertForm.onRendered(function() {
	

	pageSession.set("logInsertInsertFormInfoMessage", "");
	pageSession.set("logInsertInsertFormErrorMessage", "");

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

Template.LogInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("logInsertInsertFormInfoMessage", "");
		pageSession.set("logInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var logInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(logInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("logInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("log", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("logInsertInsertFormErrorMessage", message);
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

		

		Router.go("log", mergeObjects(Router.currentRouteParams(), {}));
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

Template.LogInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("logInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("logInsertInsertFormErrorMessage");
	}
	
});
