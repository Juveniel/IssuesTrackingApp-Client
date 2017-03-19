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