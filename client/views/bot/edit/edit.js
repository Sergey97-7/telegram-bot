var pageSession = new ReactiveDict();

Template.BotEdit.onCreated(function() {
	
});

Template.BotEdit.onDestroyed(function() {
	
});

Template.BotEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BotEdit.events({
	
});

Template.BotEdit.helpers({
	
});

Template.BotEditEditForm.onCreated(function() {
	
});

Template.BotEditEditForm.onDestroyed(function() {
	
});

Template.BotEditEditForm.onRendered(function() {
	

	pageSession.set("botEditEditFormInfoMessage", "");
	pageSession.set("botEditEditFormErrorMessage", "");

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

Template.BotEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("botEditEditFormInfoMessage", "");
		pageSession.set("botEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var botEditEditFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(botEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("botEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bot", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("botEditEditFormErrorMessage", message);
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

		

		Router.go("bot", mergeObjects(Router.currentRouteParams(), {}));
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

Template.BotEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("botEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("botEditEditFormErrorMessage");
	}
	
});
