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
	pageSession.set("newFieldCrudItems", []);


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
				

				values.newField = pageSession.get("newFieldCrudItems"); Meteor.call("testInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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
	}, 

	'click .field-new-field .crud-table-row .delete-icon': function(e, t) { e.preventDefault(); var self = this; bootbox.dialog({ message: 'Delete? Are you sure?', title: 'Delete', animate: false, buttons: { success: { label: 'Yes', className: 'btn-success', callback: function() { var items = pageSession.get('newFieldCrudItems'); var index = -1; _.find(items, function(item, i) { if(item._id == self._id) { index = i; return true; }; }); if(index >= 0) items.splice(index, 1); pageSession.set('newFieldCrudItems', items); } }, danger: { label: 'No', className: 'btn-default' } } }); return false; }
});

Template.TestInsertTestInsert.helpers({
	"infoMessage": function() {
		return pageSession.get("testInsertTestInsertInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("testInsertTestInsertErrorMessage");
	}, 
		"newFieldCrudItems": function() {
		return pageSession.get("newFieldCrudItems");
	}
});


Template.TestInsertFieldNewFieldInsertFormContainerFieldNewFieldInsertForm.onCreated(function() {
	
});

Template.TestInsertFieldNewFieldInsertFormContainerFieldNewFieldInsertForm.onDestroyed(function() {
	
});

Template.TestInsertFieldNewFieldInsertFormContainerFieldNewFieldInsertForm.onRendered(function() {
	

	pageSession.set("testInsertFieldNewFieldInsertFormContainerFieldNewFieldInsertFormInfoMessage", "");
	pageSession.set("testInsertFieldNewFieldInsertFormContainerFieldNewFieldInsertFormErrorMessage", "");

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

Template.TestInsertFieldNewFieldInsertFormContainerFieldNewFieldInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("testInsertFieldNewFieldInsertFormContainerFieldNewFieldInsertFormInfoMessage", "");
		pageSession.set("testInsertFieldNewFieldInsertFormContainerFieldNewFieldInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var testInsertFieldNewFieldInsertFormContainerFieldNewFieldInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(testInsertFieldNewFieldInsertFormContainerFieldNewFieldInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("testInsertFieldNewFieldInsertFormContainerFieldNewFieldInsertFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("testInsertFieldNewFieldInsertFormContainerFieldNewFieldInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				var data = pageSession.get("newFieldCrudItems") || []; values._id = Random.id(); data.push(values); pageSession.set("newFieldCrudItems", data); $("#field-new-field-insert-form").modal("hide"); e.currentTarget.reset();
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		$("#field-new-field-insert-form").modal("hide"); t.find("form").reset();

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

Template.TestInsertFieldNewFieldInsertFormContainerFieldNewFieldInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("testInsertFieldNewFieldInsertFormContainerFieldNewFieldInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("testInsertFieldNewFieldInsertFormContainerFieldNewFieldInsertFormErrorMessage");
	}
	
});
