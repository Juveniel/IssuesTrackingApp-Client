'use strict';

class UserController {
    constructor(requester, template, utils) {
        this.requester = requester;
        this.template = template;
        this.utils = utils;
    }

    renderLoginTemplate(content, context) {
        var $content = content;

        this.utils.showPreloader();
        this.utils.checkAuthenticated()
            .then((result) => {

                if(result.success) {
                    context.redirect('#/dashboard');
                    this.utils.hidePreloader(0);
                }
                else {
                    this.template.getTemplate('login-template')
                        .then((resultTemplate) => {
                            $content.html(resultTemplate);
                            this.utils.hidePreloader(500);
                        });
                }
            })
            .catch(() => {
                context.redirect('#/home');
                this.utils.hidePreloader(0);
            });
    }

    login(content, context) {
        var $content = content,
            data = context.params,
            errorsPlaceholder = $('#login-form-errors');

        this.utils.showPreloader();
        this.requester.post('/api/auth/login', data)
            .then((result) => {

                if (result.success) {
                    errorsPlaceholder.html();
                    errorsPlaceholder.hide();

                    localStorage.setItem('auth_token', result.auth_token);
                    context.redirect('#/dashboard');
                    this.utils.hidePreloader(500);
                } else {
                    errorsPlaceholder.html(result.message);
                    errorsPlaceholder.show();
                    this.utils.hidePreloader(500);
                }
            });
    }

    renderRegisterTemplate(content, context) {
        var $content = content;

        this.utils.showPreloader();
        this.utils.checkAuthenticated()
            .then((result) => {

                if(result.success) {
                    context.redirect('#/profile');
                    this.utils.hidePreloader(500);
                }
                else {
                    this.template.getTemplate('register-template')
                        .then((resultTemplate) => {
                            $content.html(resultTemplate);
                            this.utils.hidePreloader(500);
                        });
                }
            })
            .catch(() => {
                context.redirect('#/home');
            });
    }

    register(content, context) {
        var $content = content,
            data = context.params,
            errorsPlaceholder = $('#register-form-errors'),
            errorsPlaceholderList = $('#register-form-errors-list');

        this.utils.showPreloader();
        this.requester.post('/api/auth/register', data)
            .then((result) => {
                if (result.success) {
                    errorsPlaceholderList.html('');
                    context.redirect('#/login');
                    this.utils.hidePreloader(500);
                } else {
                    this.utils.displayErrorsList(
                        errorsPlaceholder,
                        errorsPlaceholderList,
                        result.validationErrors);
                    this.utils.hidePreloader(500);
                }
            });
    }

    logout(content, context) {
        localStorage.removeItem('auth_token');
        context.redirect('#/home');
    }
}
