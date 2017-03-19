'use strict';

class DashboardProjectsController {
    constructor(requester, template, utils) {
        this.requester = requester;
        this.template = template;
        this.utils = utils;
    }

    renderDashboardProjectsTemplate(content, context) {
        var $content = content,
            $header = $('#dashboard-header-pl'),
            $projects,
            $loggedUser;

        this.utils.getLoggedUser()
            .then((result) => {
                $loggedUser = result.user;

                return this.requester.get('/api/projects/list', $loggedUser._id);
            })
            .then((projectsData) => {
                $projects = projectsData;

                return this.template.getTemplate('admin/projects/dashboard-projects-template');
            })
            .then((resultTemplate) => {
                $header.html('Projects & Issues');
                $content.html(resultTemplate({ projects: $projects, user: $loggedUser }));
            });
    }

    renderDashboardNewProjectTemplate(content, context) {
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

                return this.template.getTemplate('admin/projects/dashboard-new-project-template');
            })
            .then((resultTemplate) => {
                $header.html('New project');
                $content.html(resultTemplate({organizations: $organizations, user: $loggedUser}));
            });
    }

    addNewProject(content, context) {
        var $content = content,
            data = context.params,
            errorsPlaceholder = $('#new-proj-form-errors'),
            errorsPlaceholderList = $('#new-proj-form-errors-list');

        this.utils.getLoggedUser()
            .then((result) => {
                var project = {
                    name: data.name,
                    organization: data.organization,
                    _creator: result.user._id
                };

                this.requester.post('/api/projects/create', project)
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

    renderDashboardProjectSettingsTemplate(content, context) {
        var $content = content,
            $header = $('#dashboard-header-pl'),
            projectId = context.params['id'],
            $organization,
            $project,
            $loggedUser;

        this.utils.getLoggedUser()
            .then((result) => {
                $loggedUser = result.user;

                return this.requester.get(`/api/projects/${projectId}/users`, $loggedUser._id);
            })
            .then((result) => {
                $organization = result.organization;
                $project = result.project;

                return this.template.getTemplate('admin/projects/dashboard-project-settings-template');
            })
            .then((resultTemplate) => {
                $header.html('Project settings');
                $content.html(resultTemplate({
                    projectId: projectId,
                    organization: $organization,
                    project: $project,
                    user: $loggedUser
                }));
            });
    }

    addCategoryToProject(content, context) {
        var errorsPlaceholder = $('#new-cat-form-errors'),
            errorsPlaceholderList = $('#new-cat-form-errors-list'),
            data = context.params,
            projectId = data['id'];

        this.utils.getLoggedUser()
            .then((result) => {
                var category = {
                    name: data.name,
                    project: projectId,
                    _creator: result.user._id
                };

                this.requester.post(`/api/projects/${projectId}/categories/create`, category)
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

    addMembersToProject(content, context) {
        var errorsPlaceholder = $('#new-proj-member-form-errors'),
            errorsPlaceholderList = $('#new-proj-member-form-errors-list'),
            data = context.params,
            projectId = data['id'];

        /* Get values for delete */
        var uncheckedItems = $(".checkbox:checkbox:not(:checked)"),
            checkedItems = $(".checkbox:checked"),
            deleteArray = [],
            newArray = [];

        uncheckedItems.each(function() {
            deleteArray.push(this.value);
        });

        checkedItems.each(function() {
            newArray.push(this.value);
        });

        var members = {
            forDelete: deleteArray,
            newMembers: newArray
        };

        this.utils.getLoggedUser()
            .then((result) => {

                this.requester.post(`/api/projects/${projectId}/members/add`, members)
                    .then((result) => {
                        if(result.success) {
                            errorsPlaceholderList.html('');
                            toastr.success(result.message);
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