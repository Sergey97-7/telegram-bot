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
	"bot",
	"bot.insert",
	"bot.details",
	"bot.edit",
	"log",
	"log.details",
	"log.edit",
	"log.insert",
	"test",
	"test.insert",
	"test.details",
	"test.edit"
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
	this.route("/bot", {name: "bot", title: "", controller: "BotController"});
	this.route("/bot/insert", {name: "bot.insert", title: "", controller: "BotInsertController"});
	this.route("/bot/details/:botId", {name: "bot.details", title: "", controller: "BotDetailsController"});
	this.route("/bot/edit/:botId", {name: "bot.edit", title: "", controller: "BotEditController"});
	this.route("/log", {name: "log", title: "", controller: "LogController"});
	this.route("/log/details/:logId", {name: "log.details", title: "", controller: "LogDetailsController"});
	this.route("/log/edit/:logId", {name: "log.edit", title: "", controller: "LogEditController"});
	this.route("/log/insert", {name: "log.insert", title: "", controller: "LogInsertController"});
	this.route("/test", {name: "test", title: "", controller: "TestController"});
	this.route("/test/insert", {name: "test.insert", title: "", controller: "TestInsertController"});
	this.route("/test/details/:testId", {name: "test.details", title: "", controller: "TestDetailsController"});
	this.route("/test/edit/:testId", {name: "test.edit", title: "", controller: "TestEditController"});
});
