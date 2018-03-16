var pageSession = new ReactiveDict();

Template.LogEdit.onCreated(function() {
	
});

Template.LogEdit.onDestroyed(function() {
	
});

Template.LogEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LogEdit.events({
	
});

Template.LogEdit.helpers({
	
});

Template.LogEditEditForm.onCreated(function() {
	
});

Template.LogEditEditForm.onDestroyed(function() {
	
});

Template.LogEditEditForm.onRendered(function() {
	

	pageSession.set("logEditEditFormInfoMessage", "");
	pageSession.set("logEditEditFormErrorMessage", "");

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

Template.LogEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("logEditEditFormInfoMessage", "");
		pageSession.set("logEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var logEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(logEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("logEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("log", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("logEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("logUpdate", t.data.log_details._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.LogEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("logEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("logEditEditFormErrorMessage");
	}
	
});
