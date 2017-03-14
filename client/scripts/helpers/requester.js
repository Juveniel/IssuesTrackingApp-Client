'use strict';
const API_URL = 'http://localhost:3000';

class Requester {
    get(url, options = {}){
        let token = window.localStorage.getItem('auth_token');

        return new Promise((resolve, reject) => {
            let headers = options.headers || {};
            headers.authrorization = token;

            $.ajax({
                url: API_URL + url,
                contentType: 'application/json',
                headers: {
                    'authorization': token
                },
                method: 'GET'
            })
            .done(resolve)
            .fail(reject);
        });
    }

    post(url, data, options = {}){
        let token = window.localStorage.getItem('auth_token');

        return new Promise((resolve, reject) => {
            let headers = options.headers || {};
            headers.authrorization = token;

            $.ajax({
                url: API_URL + url,
                contentType: 'application/json',
                method: 'POST',
                headers: {
                    'authorization': token
                },
                data: JSON.stringify(data)
            })
            .done(resolve)
            .fail(err => {
                reject(err);
            });
        });
    }

    put(url, data, options = {}) {
        let token = window.localStorage.getItem('auth_token');

        return new Promise((resolve, reject) => {
            let headers = options.headers || {};
            headers.authrorization = token;

            $.ajax({
                url: API_URL + url,
                contentType: 'application/json',
                method: 'PUT',
                headers: {
                    'authorization': token
                },
                data: JSON.stringify(data)
            })
            .done(resolve)
            .fail(reject);
        });
    }
}