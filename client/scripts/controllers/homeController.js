'use strict';

class HomeController {
    constructor(homeData, template) {
        this.homeData = homeData;
        this.template = template;
    }

    renderHomeTemplate(content, context) {
        var $content = content;

        this.template.getTemplate('home-template')
            .then((resultTemplate) => {
                $content.html(resultTemplate);
            });
    }
}