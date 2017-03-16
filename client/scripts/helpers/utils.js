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
}