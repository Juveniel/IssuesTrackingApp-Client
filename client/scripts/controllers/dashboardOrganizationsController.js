'use strict';

class DashboardOrganizationsController {
    constructor(requester, template, utils) {
        this.requester = requester;
        this.template = template;
        this.utils = utils;
    }

    renderDashboardOrganizationsTemplate(content, context) {
        var $content = content,
            $header = $('#dashboard-header-pl'),
            $organizations,
            $loggedUser;

        this.utils.getLoggedUser()
            .then((result) => {
                $loggedUser = result.user;

                return this.requester.get('/api/organizations/list', $loggedUser._id);
            })
            .then((organizationsData) => {
                $organizations = organizationsData;

                return this.template.getTemplate('admin/organizations/dashboard-organizations-template');
            })
            .then((resultTemplate) => {
                $header.html('Organizations & People');
                $content.html(resultTemplate({organizations: $organizations, user: $loggedUser}));
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
            data = context.params,
            errorsPlaceholder = $('#new-org-form-errors'),
            errorsPlaceholderList = $('#new-org-form-errors-list');

        this.utils.getLoggedUser()
            .then((result) => {
                var org = {
                    name: data.name,
                    _creator: result.user._id
                };

                this.requester.post('/api/organizations/create', org)
                    .then((result) => {
                        if(result.success) {
                            errorsPlaceholderList.html('');
                            toastr.success(result.message);
                            context.redirect('#/dashboard/organizations');
                        }
                        else {
                            this.utils.displayErrorsList(
                                errorsPlaceholder,
                                errorsPlaceholderList,
                                result.validationErrors);
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
            data = context.params,
            errorsPlaceholder = $('#new-org-member-form-errors'),
            errorsPlaceholderList = $('#new-org-member-form-errors-list');

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
                            this.utils.displayErrorsList(
                                errorsPlaceholder,
                                errorsPlaceholderList,
                                result.validationErrors);
                        }
                    });

            });
    }
}