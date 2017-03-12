'use strict';

class UserController {
    constructor(userData, template) {
        this.userData = userData;
        this.template = template;
    }

    renderLoginTemplate(content, context) {
        var $content = content;

        this.template.getTemplate('login-template')
            .then((resultTemplate) => {
                $content.html(resultTemplate);
            });
    }

    renderRegisterTemplate(content, context) {
        var $content = content;

        this.template.getTemplate('register-template')
            .then((resultTemplate) => {
                $content.html(resultTemplate);
            });
    }
}