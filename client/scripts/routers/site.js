'use strict';

var siteRouter = Sammy('#l-page-content', function () {
    let $content = $('#l-page-content');

    let requester = new Requester();
    let template = new HandlebarsTemplate();
    let utils = new Utils(requester);

    let homeController = new HomeController(requester, template),
        userController = new UserController(requester, template, utils);

    // Home
    this.get('/', function (context) {
        context.redirect('#/home');
    });

    this.get('#/home', function (context) {
        utils.appendBodyClass('home');

        homeController.renderHomeTemplate($content, context);
    });

    this.get(/#\/home(#.+)?/, function () {
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
});

siteRouter.run('#/');



