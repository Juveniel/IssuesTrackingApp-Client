'use strict';

class DashboardController {
    constructor(requester, template, utils) {
        this.requester = requester;
        this.template = template;
        this.utils = utils;
    }

    renderDashboardTemplate(content, context) {
        var $content = content;

        this.template.getTemplate('admin/dashboard-template')
            .then((resultTemplate) => {
                $content.html(resultTemplate);
            });
    }

    renderDashboardOrganizationsTemplate(content, context) {
        var $content = content,
            $header = $('#dashboard-header-pl'),
            $organizations;

        this.utils.getLoggedUser()
            .then((result) => {
                var userId = result.user._id;

                return this.requester.get('/api/organizations/list', userId);
            })
            .then((organizationsData) => {
                $organizations = organizationsData;

                return this.template.getTemplate('admin/organizations/dashboard-organizations-template');
            })
            .then((resultTemplate) => {

                $header.html('Organizations & People');
                console.log($organizations);
                $content.html(resultTemplate({organizations: $organizations}));
            });
    }

    renderDashboardNewOrganizationTemplate(content, context) {
        var $content = content,
            $header = $('#dashboard-header-pl');

        this.template.getTemplate('admin/organizations/dashboard-new-organization-template')
            .then((resultTemplate) => {
                $header.html('New organization');
                $content.html(resultTemplate);
            });
    }

    createOrganization(content, context) {
        var $content = content,
            data = context.params;

            this.utils.getLoggedUser()
                .then((result) => {
                     var org = {
                         name: data.name,
                         _creator: result.user._id
                     };

                     this.requester.post('/api/organizations/create', org)
                         .then((result) => {
                             if(result.success) {
                                 toastr.success(result.message);
                                 context.redirect('#/dashboard/organizations');
                             }
                             else {
                                 // err
                             }
                         });

                });
    }

    renderDashboardAddOrganizationMemberTemplate(content, context) {
        var $content = content,
            $header = $('#dashboard-header-pl'),
            $organizationId = context.params['id'];

        this.template.getTemplate('admin/organizations/dashboard-add-organization-member-template')
            .then((resultTemplate) => {
                $header.html('New organization member');
                $content.html(resultTemplate({
                    organizationId: $organizationId
                }));
            });
    }

    addOrganizationMember(content, context) {
        var $content = content,
            data = context.params;

        this.utils.getLoggedUser()
            .then((result) => {
                var organizationId = data['id'],
                    userData = {
                        username: data['username'],
                        email: data['email']
                    };

                this.requester.post(`/api/organizations/${organizationId}/add`, userData)
                    .then((result) => {
                        if(result.success) {
                            toastr.success(result.message);
                            context.redirect('#/dashboard/organizations');
                        }
                        else {
                            // err
                        }
                    });

            });
    }

    renderDashboardProjectsTemplate(content, context) {
        var $content = content,
            $header = $('#dashboard-header-pl');

            this.template.getTemplate('admin/dashboard-projects-template')
                .then((resultTemplate) => {
                    $header.html('Projects & Issues');
                    $content.html(resultTemplate);
                });
    }

    renderDashboardAccountTemplate(content, context) {
        var $content = content,
            $header = $('#dashboard-header-pl');

            this.template.getTemplate('admin/dashboard-account-template')
                .then((resultTemplate) => {
                    $header.html('Account');
                    $content.html(resultTemplate);
                });
    }
}