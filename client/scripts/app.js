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
            dashboardController = new DashboardController(requester, template, utils),
            dashboardOrganizationsController = new DashboardOrganizationsController(requester, template, utils),
            dashboardProjectsController = new DashboardProjectsController(requester, template, utils),
            dashboardIssuesController = new DashboardIssuesController(requester, template, utils);

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
        
        // Dashboard Organizations
        this.get('#/dashboard/organizations', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardOrganizationsController.renderDashboardOrganizationsTemplate($dashboardContent, context);
        });

        this.get('#/dashboard/organizations/new', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardOrganizationsController.renderDashboardNewOrganizationTemplate($dashboardContent, context);
        });

        this.post('#/dashboard/organizations/new', function (context) {
            dashboardOrganizationsController.createOrganization($dashboardContent, context);
        });

        this.get('#/dashboard/organizations/:id/add', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardOrganizationsController.renderDashboardAddOrganizationMemberTemplate($dashboardContent, context);
        });

        this.post('#/dashboard/organizations/:id/add', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardOrganizationsController.addOrganizationMember($dashboardContent, context);
        });
        
        // Dashboard Projects
        this.get('#/dashboard/projects', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardProjectsController.renderDashboardProjectsTemplate($dashboardContent, context);
        });

        this.get('#/dashboard/projects/new', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardProjectsController.renderDashboardNewProjectTemplate($dashboardContent, context);
        });

        this.post('#/dashboard/projects/new', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardProjectsController.addNewProject($dashboardContent, context);
        });

        this.get('#/dashboard/projects/:id/settings', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardProjectsController.renderDashboardProjectSettingsTemplate($dashboardContent, context);
        });

        this.post('#/dashboard/projects/:id/categories/add', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardProjectsController.addCategoryToProject($dashboardContent, context);
        });

        this.post('#/dashboard/projects/:id/members/add', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardProjectsController.addMembersToProject($dashboardContent, context);
        });

        // Dashboard Issues
        this.get('#/dashboard/projects/:id/issues/new', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardIssuesController.renderDashboardNewProjectIssueTemplate($dashboardContent, context);
        });

        this.post('#/dashboard/projects/:id/issues/new', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardIssuesController.createNewProjectIssue($dashboardContent, context);
        });

        this.get('#/dashboard/projects/:id/issues/list', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardIssuesController.renderDashboardProjectIssuesListTemplate($dashboardContent, context);
        });

        this.get('#/dashboard/projects/:id/issues/:issueId', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardIssuesController.renderDashboardIssuesViewTemplate($dashboardContent, context);
        });

        this.post('#/dashboard/issues/:issueId', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardIssuesController.updateIssue($dashboardContent, context);
        });
        
        // Dashboard Account
        this.get('#/dashboard/account', function (context) {
            utils.appendBodyClass('dashboard');

            dashboardController.renderDashboardAccountTemplate($dashboardContent, context);
        });
    });

    siteRouter.run('#/');

})(window, jQuery);



