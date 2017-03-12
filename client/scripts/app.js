'use strict';
(function (window, $) {
    var router = Sammy('#l-page-content', function () {
        let $content = $('#l-page-content');

        let requester = new Requester();
        let template = new HandlebarsTemplate();


        let homeData = new HomeData(requester),
            userData = new UserData(requester);

        let homeController = new HomeController(homeData, template),
            userController = new UserController(userData, template);


        this.get('/', function (context) {
            context.redirect('#/home');
        });

        this.get('#/home', function (context) {
            homeController.renderHomeTemplate($content, context);
        });

        this.get('#/register', function (context) {
            userController.renderRegisterTemplate($content, context);
        });

        this.get('#/login', function (context) {
            userController.renderLoginTemplate($content, context);
        });

        this.get(/#\/home(#.+)?/, function() {
            context.redirect('#/home');
        });
    });

    router.run('#/');

})(window, jQuery);



