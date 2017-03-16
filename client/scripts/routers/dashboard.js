'use strict';

$(function() {

    // Dashboard router
    var dashboardRouter = Sammy('#dashboard-main-content', function () {
        let $dashboardContent = $('#dashboard-main-content');

        let requester = new Requester();
        let template = new HandlebarsTemplate();
        let utils = new Utils(requester);

        let dashboardController = new DashboardController(requester, template, utils);

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

    dashboardRouter.run('#/dashboard');
});