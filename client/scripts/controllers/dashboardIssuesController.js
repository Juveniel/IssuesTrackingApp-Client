'use strict';

class DashboardIssuesController {
    constructor(requester, template, utils) {
        this.requester = requester;
        this.template = template;
        this.utils = utils;
    }

    renderDashboardNewProjectIssueTemplate(content, context) {
        var $content = content,
            $header = $('#dashboard-header-pl'),
            projectId = context.params['id'],
            $loggedUser,
            $project,
            $priorities;

        this.utils.getLoggedUser()
            .then((result) => {
                $loggedUser = result.user;

                return this.requester.get(`/api/projects/${projectId}/data`);
            })
            .then((result) => {
                $project = result.project;
                $priorities = result.priorities;

                return this.template.getTemplate('admin/projects/dashboard-new-project-issue-template');
            })
            .then((resultTemplate) => {
                $header.html('Add new issue to project');
                $content.html(resultTemplate({
                    projectId: projectId,
                    project: $project,
                    priorities: $priorities,
                    user: $loggedUser
                }));
            });
    }

    createNewProjectIssue(content, context) {
        var $content = content,
            data = context.params,
            errorsPlaceholder = $('#new-proj-issue-form-errors'),
            errorsPlaceholderList = $('#new-proj-issue-form-errors-list');

        this.utils.getLoggedUser()
            .then((result) => {

                this.requester.post('/api/projects/:id/issues/create', data)
                    .then((result) => {
                        if(result.success) {
                            errorsPlaceholderList.html('');
                            toastr.success(result.message);
                            context.redirect('#/dashboard/projects');
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

    renderDashboardProjectIssuesListTemplate(content, context) {
        var $content = content,
            $header = $('#dashboard-header-pl'),
            projectId = context.params['id'],
            $loggedUser,
            $project;

        this.utils.getLoggedUser()
            .then((result) => {
                $loggedUser = result.user;

                return this.requester.get(`/api/projects/${projectId}/data`);
            })
            .then((result) => {
                $project = result.project;

                return this.template.getTemplate('admin/projects/dashboard-project-issues-list-template');
            })
            .then((resultTemplate) => {
                $header.html('Add new issue to project');
                $content.html(resultTemplate({
                    projectId: projectId,
                    project: $project,
                    user: $loggedUser
                }));
            });
    }

    renderDashboardIssuesViewTemplate(content, context) {
        var $content = content,
            $header = $('#dashboard-header-pl'),
            issueId = context.params['issueId'],
            $loggedUser,
            $issue,
            $statuses,
            $priorities;

        this.utils.getLoggedUser()
            .then((result) => {
                $loggedUser = result.user;

                return this.requester.get(`/api/issues/${issueId}`);
            })
            .then((result) => {
                $issue = result.issue;
                $priorities = result.priorities;
                $statuses = result.statuses;

                return this.template.getTemplate('admin/projects/dashboard-project-issue-view-template');
            })
            .then((resultTemplate) => {
                $header.html('Issue');
                $content.html(resultTemplate({
                    issue: $issue,
                    issueId: issueId,
                    priorities: $priorities,
                    statuses: $statuses,
                    user: $loggedUser
                }));
            });
    }

    updateIssue(content, context) {
        var $content = content,
            data = context.params,
            errorsPlaceholder = $('#upd-proj-issue-form-errors'),
            errorsPlaceholderList = $('#upd-proj-issue-form-errors-list');

        this.utils.getLoggedUser()
            .then((result) => {

                this.requester.post('/api/issues/:id', data)
                    .then((result) => {
                        if(result.success) {
                            errorsPlaceholderList.html('');
                            toastr.success(result.message);
                            context.redirect('#/dashboard/projects');
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