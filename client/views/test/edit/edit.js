var pageSession = new ReactiveDict();

Template.TestEdit.onCreated(function() {
	
});

Template.TestEdit.onDestroyed(function() {
	
});

Template.TestEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TestEdit.events({
	
});

Template.TestEdit.helpers({
	
});

Template.TestEditEditTest.onCreated(function() {
	
});

Template.TestEditEditTest.onDestroyed(function() {
	
});

Template.TestEditEditTest.onRendered(function() {
	pageSession.set("newFieldCrudItems", this.data.test_details.newField || []);


	pageSession.set("testEditEditTestInfoMessage", "");
	pageSession.set("testEditEditTestErrorMessage", "");

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

Template.TestEditEditTest.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("testEditEditTestInfoMessage", "");
		pageSession.set("testEditEditTestErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var testEditEditTestMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(testEditEditTestMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("testEditEditTestInfoMessage", message);
					}; break;
				}
			}

			Router.go("test", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("testEditEditTestErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				values.newField = pageSession.get("newFieldCrudItems"); Meteor.call("testUpdate", t.data.test_details._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.TestEditEditTest.helpers({
	"infoMessage": function() {
		return pageSession.get("testEditEditTestInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("testEditEditTestErrorMessage");
	}, 
		"newFieldCrudItems": function() {
		return pageSession.get("newFieldCrudItems");
	}
});


Template.TestEditFieldNewFieldInsertFormContainerFieldNewFieldInsertForm.onCreated(function() {
	
});

Template.TestEditFieldNewFieldInsertFormContainerFieldNewFieldInsertForm.onDestroyed(function() {
	
});

Template.TestEditFieldNewFieldInsertFormContainerFieldNewFieldInsertForm.onRendered(function() {
	

	pageSession.set("testEditFieldNewFieldInsertFormContainerFieldNewFieldInsertFormInfoMessage", "");
	pageSession.set("testEditFieldNewFieldInsertFormContainerFieldNewFieldInsertFormErrorMessage", "");

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

Template.TestEditFieldNewFieldInsertFormContainerFieldNewFieldInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("testEditFieldNewFieldInsertFormContainerFieldNewFieldInsertFormInfoMessage", "");
		pageSession.set("testEditFieldNewFieldInsertFormContainerFieldNewFieldInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var testEditFieldNewFieldInsertFormContainerFieldNewFieldInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(testEditFieldNewFieldInsertFormContainerFieldNewFieldInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("testEditFieldNewFieldInsertFormContainerFieldNewFieldInsertFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("testEditFieldNewFieldInsertFormContainerFieldNewFieldInsertFormErrorMessage", message);
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

Template.TestEditFieldNewFieldInsertFormContainerFieldNewFieldInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("testEditFieldNewFieldInsertFormContainerFieldNewFieldInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("testEditFieldNewFieldInsertFormContainerFieldNewFieldInsertFormErrorMessage");
	}
	
});
