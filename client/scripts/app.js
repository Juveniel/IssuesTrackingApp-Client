'use strict';

var router = Sammy('#l-page-content', function () {
    let $content = $('#l-page-content');

    let requester = new Requester();
    let template = new HandlebarsTemplate();

    /* Load Controllers */
    let homeData = new HomeData(requester);
    let homeController = new HomeController(homeData, template);

    /* Routing */
    this.get('/', function (context) {
        context.redirect('#/home');
    });

    this.get('#/home', function (context) {
        homeController.renderHomeTemplate($content, context);
    });
});

router.run('#/');
