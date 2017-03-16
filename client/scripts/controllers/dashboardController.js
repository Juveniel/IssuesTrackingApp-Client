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
            $header = $('#dashboard-header-pl');

            this.template.getTemplate('admin/organizations/dashboard-organizations-template')
                .then((resultTemplate) => {
                    $header.html('Organizations & People');
                    $content.html(resultTemplate);
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

        alert('vliza');

        this.requester.post('/api/organizations/create', data)
            .then((result) => {
                console.log(result);
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