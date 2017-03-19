'use strict';

class Utils {
    constructor(requester) {
        this.requester = requester;
    }

    getLoggedUser() {
        return this.requester.get('/api/auth/getLoggedUser');
    }

    checkAuthenticated() {
        return this.requester.get('/api/auth/verify');
    }

    appendBodyClass(bodyClass) {
        $('body').attr('class', '');
        $('body').addClass(bodyClass);
    }

    displayErrorsList(errorsPlaceholder, placeholderList, errors) {
        placeholderList.html('');
        
        $.each(errors, function(i, err) {
            placeholderList.append('<li>' + err + '</li>');
        });

        errorsPlaceholder.show();
    }

    validateRecaptcha(errorElement) {
        let v = grecaptcha.getResponse(),
            $errorDiv = $('#' + errorElement);
        
        if(v.length == 0)
        {
            $errorDiv.html('You must not leave Captcha Code empty');
            return false;
        }
        else
        {
            $errorDiv.html('Captcha completed');
            return true;
        }
    }
}