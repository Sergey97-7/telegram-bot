var pageSession = new ReactiveDict();

Template.TestDetails.onCreated(function() {
	
});

Template.TestDetails.onDestroyed(function() {
	
});

Template.TestDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TestDetails.events({
	
});

Template.TestDetails.helpers({
	
});

Template.TestDetailsDetailsTest.onCreated(function() {
	
});

Template.TestDetailsDetailsTest.onDestroyed(function() {
	
});

Template.TestDetailsDetailsTest.onRendered(function() {
	

	pageSession.set("testDetailsDetailsTestInfoMessage", "");
	pageSession.set("testDetailsDetailsTestErrorMessage", "");

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

Template.TestDetailsDetailsTest.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("testDetailsDetailsTestInfoMessage", "");
		pageSession.set("testDetailsDetailsTestErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var testDetailsDetailsTestMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(testDetailsDetailsTestMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("testDetailsDetailsTestInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("testDetailsDetailsTestErrorMessage", message);
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

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("test", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("test", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.TestDetailsDetailsTest.helpers({
	"infoMessage": function() {
		return pageSession.get("testDetailsDetailsTestInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("testDetailsDetailsTestErrorMessage");
	}
	
});
