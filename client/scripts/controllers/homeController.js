'use strict';

class HomeController {
    constructor(requester, template, utils) {
        this.requester = requester;
        this.template = template;
        this.utils = utils;
    }

    renderHomeTemplate(content, context) {
        var $content = content;
        $('#preloader').show();

        this.template.getTemplate('home-template')
            .then((resultTemplate) => {
                $content.html(resultTemplate);
                $('#preloader').hide();
            });
    }

    sendContactMail(content, context) {
        var $content = content,
            data = context.params,
            errorsPlaceholder = $('#contact-form-errors'),
            errorsPlaceholderList = $('#contact-form-errors-list');

        this.utils.validateRecaptcha('captcha-error');

        this.requester.post('/api/home/contact', data)
            .then((result) => {
                if(result.success) {
                    errorsPlaceholderList.html('');
                    toastr.success(result.message);

                    // Clear form data
                    $('#hp-contact-form')[0].reset();
                    grecaptcha.reset();
                }
                else {
                    this.utils.displayErrorsList(
                        errorsPlaceholder,
                        errorsPlaceholderList,
                        result.validationErrors);
                }
            });
    }
}