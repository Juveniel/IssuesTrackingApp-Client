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
                    context.redirect('#/dashboard');
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
            data = context.params,
            errorsPlaceholder = $('#login-form-errors');

        this.requester.post('/api/auth/login', data)
            .then((result) => {

                if (result.success) {
                    errorsPlaceholder.html();
                    errorsPlaceholder.hide();

                    localStorage.setItem('auth_token', result.auth_token);
                    context.redirect('#/dashboard');
                } else {
                    errorsPlaceholder.html(result.message);
                    errorsPlaceholder.show();
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
            data = context.params,
            errorsPlaceholder = $('#register-form-errors'),
            errorsPlaceholderList = $('#register-form-errors-list');

        this.requester.post('/api/auth/register', data)
            .then((result) => {
                if (result.success) {
                    errorsPlaceholderList.html('');
                    context.redirect('#/login');
                } else {
                    errorsPlaceholderList.html('');

                    $.each(result.validationErrors, function(i, err) {
                        errorsPlaceholderList.append('<li>' + err + '</li>');
                    });
                    
                    errorsPlaceholder.show();
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

    renderDashboardOrganizationsTemplate(content, context) {
        var $content = content;

        this.utils.getLoggedUser()
            .then((user) => {
                this.template.getTemplate('admin/dashboard-organizations-template')
                    .then((resultTemplate) => {
                        $content.html(resultTemplate);
                    });
            })
            .catch(() => {
                context.redirect('#/login');
            });
    }

    renderDashboardProjectsTemplate(content, context) {
        var $content = content;

        this.utils.getLoggedUser()
            .then((user) => {
                this.template.getTemplate('admin/dashboard-projects-template')
                    .then((resultTemplate) => {
                        $content.html(resultTemplate);
                    });
            })
            .catch(() => {
                context.redirect('#/login');
            });
    }

    renderDashboardAccountTemplate(content, context) {
        var $content = content;

        this.utils.getLoggedUser()
            .then((user) => {
                this.template.getTemplate('admin/dashboard-account-template')
                    .then((resultTemplate) => {
                        $content.html(resultTemplate);
                    });
            })
            .catch(() => {
                context.redirect('#/login');
            });
    }
}
