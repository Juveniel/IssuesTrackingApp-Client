'use strict';
(function (window, $) {
    var router = Sammy('#l-page-content', function () {
        let $content = $('#l-page-content');

        let requester = new Requester();
        let template = new HandlebarsTemplate();
        let utils = new Utils(requester);

        let homeController = new HomeController(requester, template),
            userController = new UserController(requester, template, utils);

        this.get('/', function (context) {
            context.redirect('#/home');
        });

        this.get('#/home', function (context) {
            homeController.renderHomeTemplate($content, context);
        });

        this.get(/#\/home(#.+)?/, function() {
            context.redirect('#/home');
        });

        this.get('#/register', function (context) {
            userController.renderRegisterTemplate($content, context);
        });

        this.post('#/register', function (context) {
            userController.register($content, context);
        });

        this.get('#/login', function (context) {
            userController.renderLoginTemplate($content, context);
        });

        this.post('#/login', function (context) {
            userController.login($content, context);
        });

        this.get('#/dashboard', function (context) {
            userController.renderDashboardTemplate($content, context);
        });
    });

    router.run('#/');

})(window, jQuery);



