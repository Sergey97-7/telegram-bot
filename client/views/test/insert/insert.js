var pageSession = new ReactiveDict();

Template.TestInsert.onCreated(function() {
	
});

Template.TestInsert.onDestroyed(function() {
	
});

Template.TestInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TestInsert.events({
	
});

Template.TestInsert.helpers({
	
});

Template.TestInsertTestInsert.onCreated(function() {
	
});

Template.TestInsertTestInsert.onDestroyed(function() {
	
});

Template.TestInsertTestInsert.onRendered(function() {
	

	pageSession.set("testInsertTestInsertInfoMessage", "");
	pageSession.set("testInsertTestInsertErrorMessage", "");

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

Template.TestInsertTestInsert.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("testInsertTestInsertInfoMessage", "");
		pageSession.set("testInsertTestInsertErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var testInsertTestInsertMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(testInsertTestInsertMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("testInsertTestInsertInfoMessage", message);
					}; break;
				}
			}

			Router.go("test", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("testInsertTestInsertErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("testInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("test", mergeObjects(Router.currentRouteParams(), {}));
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

Template.TestInsertTestInsert.helpers({
	"infoMessage": function() {
		return pageSession.get("testInsertTestInsertInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("testInsertTestInsertErrorMessage");
	}
	
});
