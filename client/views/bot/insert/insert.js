var pageSession = new ReactiveDict();

Template.BotInsert.onCreated(function() {
	
});

Template.BotInsert.onDestroyed(function() {
	
});

Template.BotInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BotInsert.events({
	
});

Template.BotInsert.helpers({
	
});

Template.BotInsertInsertForm.onCreated(function() {
	
});

Template.BotInsertInsertForm.onDestroyed(function() {
	
});

Template.BotInsertInsertForm.onRendered(function() {
	

	pageSession.set("botInsertInsertFormInfoMessage", "");
	pageSession.set("botInsertInsertFormErrorMessage", "");

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

Template.BotInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("botInsertInsertFormInfoMessage", "");
		pageSession.set("botInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var botInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(botInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("botInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("bot", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("botInsertInsertFormErrorMessage", message);
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

Template.BotInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("botInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("botInsertInsertFormErrorMessage");
	}, 
	'nextId': function() { var max = 0; var num = bot.find({}, { fields: { Id: 1 }}).fetch(); _.each(num, function(doc) { var intNum = parseInt(doc.Id); if(!isNaN(intNum) && intNum > max) max = intNum; }); return max + 1; }
});
