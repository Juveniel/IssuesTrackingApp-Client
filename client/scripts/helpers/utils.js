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
}