'use strict';

class HomeController {
    constructor(requester, template) {
        this.requester = requester;
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