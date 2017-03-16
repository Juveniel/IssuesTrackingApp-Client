'use strict';

(function (window, $) {

    // Site router
    var siteRouter = Sammy('#content', function () {
        let $content = $('#l-page-content'),
            $dashboardContent = $('#dashboard-main-content');

        let requester = new Requester();
        let template = new HandlebarsTemplate();
        let utils = new Utils(requester);

        let homeController = new HomeController(requester, template),
            userController = new UserController(requester, template, utils),
            dashboardController = new DashboardController(requester, template, utils);

        // Check Authentication
        this.before({ except: { path: ['#/', '#/home', '#/login', '#/register'] } }, context => {
            utils.checkAuthenticated()
                .then((result) => {
                    if(!result.success) {
                        context.redirect('#/login');
                        return false;
                    }
                });
        });

        // Home
        this.get('/', function (context) {
            context.redirect('#/home');
        });

        this.get('#/home', function (context) {
            utils.appendBodyClass('home');

            homeController.renderHomeTemplate($content, context);
        });

        this.get(/#\/home(#.+)?/, function() {
            context.redirect('#/home');
        });

        // Authentication
        this.get('#/register', function (context) {
            utils.appendBodyClass('home register');

            userController.renderRegisterTemplate($content, context);
        });

        this.post('#/register', function (context) {
            userController.register($content, context);
        });

        this.get('#/login', function (context) {
            utils.appendBodyClass('home login');

            userController.renderLoginTemplate($content, context);
        });

        this.post('#/login', function (context) {
            userController.login($content, context);
        });

        this.get('#/logout', function (context) {
            userController.logout($content, context);
        });

        // Dashboard
        this.get('#/dashboard', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardController.renderDashboardTemplate($dashboardContent, context);
        });

        this.get('#/dashboard/organizations', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardController.renderDashboardOrganizationsTemplate($dashboardContent, context);
        });

        this.get('#/dashboard/organizations/new', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardController.renderDashboardNewOrganizationTemplate($dashboardContent, context);
        });

        this.post('#/dashboard/organizations/new', function (context) {
            dashboardController.createOrganization($dashboardContent, context);
        });

        this.get('#/dashboard/projects', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardController.renderDashboardProjectsTemplate($dashboardContent, context);
        });

        this.get('#/dashboard/account', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardController.renderDashboardAccountTemplate($dashboardContent, context);
        });
    });

    siteRouter.run('#/');

})(window, jQuery);



