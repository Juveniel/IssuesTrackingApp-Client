'use strict';

class UserController {
    constructor(requester, template, utils) {
        this.requester = requester;
        this.template = template;
        this.utils = utils;
    }

    renderLoginTemplate(content, context) {
        var $content = content;

        this.utils.checkAuthenticated()
            .then((result) => {

                if(result.success) {
                    context.redirect('#/profile');
                }
                else {
                    this.template.getTemplate('login-template')
                        .then((resultTemplate) => {
                            $content.html(resultTemplate);
                        });
                }
            })
            .catch(() => {
                context.redirect('#/home');
            });
    }

    login(content, context) {
        var $content = content,
            data = context.params;

        this.requester.post('/api/auth/login', data)
            .then((result) => {

                if (result.success) {
                    localStorage.setItem('auth_token', result.auth_token);
                    context.redirect('#/home');
                } else {
                    // show error
                }
            });
    }

    renderRegisterTemplate(content, context) {
        var $content = content;

        this.utils.checkAuthenticated()
            .then((result) => {

                if(result.success) {
                    context.redirect('#/profile');
                }
                else {
                    this.template.getTemplate('register-template')
                        .then((resultTemplate) => {
                            $content.html(resultTemplate);
                        });
                }
            })
            .catch(() => {
                context.redirect('#/home');
            });
    }

    register(content, context) {
        var $content = content,
            data = context.params;

        this.requester.post('/api/auth/register', data)
            .then((result) => {
                if (result.success) {
                    context.redirect('#/login');
                } else {
                    //show error
                }
            });
    }

    renderDashboardTemplate(content, context) {
        var $content = content;

        this.utils.getLoggedUser()
            .then((user) => {
                this.template.getTemplate('admin/dashboard-template')
                    .then((resultTemplate) => {
                        $content.html(resultTemplate);
                    });
            })
            .catch(() => {
                context.redirect('#/login');
            });

    }
}
