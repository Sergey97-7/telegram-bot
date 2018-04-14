Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.publicRoutes = [
	"login",
	"register",
	"verify_email",
	"forgot_password",
	"reset_password"
];

Router.privateRoutes = [
	"home_private",
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout",
	"questions",
	"questions.insert",
	"questions.details",
	"questions.edit",
	"logs",
	"logs.details",
	"logs.edit",
	"logs.insert",
	"answers",
	"answers.insert",
	"answers.details",
	"answers.edit"
];

Router.freeRoutes = [
	"home_public"
];

Router.roleMap = [
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] },
	{ route: "user_settings",	roles: ["user","admin"] },
	{ route: "user_settings.profile",	roles: ["user","admin"] },
	{ route: "user_settings.change_pass",	roles: ["user","admin"] }
];

Router.defaultFreeRoute = "home_public";
Router.defaultPublicRoute = "home_public";
Router.defaultPrivateRoute = "home_private";

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: Router.publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: Router.privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: Router.freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("/", {name: "home_public", title: "", controller: "HomePublicController"});
	this.route("/login", {name: "login", title: "", controller: "LoginController"});
	this.route("/register", {name: "register", title: "", controller: "RegisterController"});
	this.route("/verify_email/:verifyEmailToken", {name: "verify_email", title: "", controller: "VerifyEmailController"});
	this.route("/forgot_password", {name: "forgot_password", title: "", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", title: "", controller: "ResetPasswordController"});
	this.route("/home_private", {name: "home_private", title: "Welcome {{userFullName}}!", controller: "HomePrivateController"});
	this.route("/admin", {name: "admin", title: "", controller: "AdminController"});
	this.route("/admin/users", {name: "admin.users", title: "", controller: "AdminUsersController"});
	this.route("/admin/users/details/:userId", {name: "admin.users.details", title: "", controller: "AdminUsersDetailsController"});
	this.route("/admin/users/edit/:userId", {name: "admin.users.edit", title: "", controller: "AdminUsersEditController"});
	this.route("/user_settings", {name: "user_settings", title: "", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", title: "", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", title: "", controller: "UserSettingsChangePassController"});
	this.route("/logout", {name: "logout", title: "", controller: "LogoutController"});
	this.route("/questions", {name: "questions", title: "", controller: "QuestionsController"});
	this.route("/questions/insert", {name: "questions.insert", title: "", controller: "QuestionsInsertController"});
	this.route("/questions/details/:botId", {name: "questions.details", title: "", controller: "QuestionsDetailsController"});
	this.route("/questions/edit/:botId", {name: "questions.edit", title: "", controller: "QuestionsEditController"});
	this.route("/logs", {name: "logs", title: "", controller: "LogsController"});
	this.route("/logs/details/:logId", {name: "logs.details", title: "", controller: "LogsDetailsController"});
	this.route("/logs/edit/:logId", {name: "logs.edit", title: "", controller: "LogsEditController"});
	this.route("/logs/insert", {name: "logs.insert", title: "", controller: "LogsInsertController"});
	this.route("/answers", {name: "answers", title: "", controller: "AnswersController"});
	this.route("/answers/insert", {name: "answers.insert", title: "", controller: "AnswersInsertController"});
	this.route("/answers/details/:answerId", {name: "answers.details", title: "", controller: "AnswersDetailsController"});
	this.route("/answers/edit/:answerId", {name: "answers.edit", title: "", controller: "AnswersEditController"});
});
