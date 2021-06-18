import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';
import { authenticationService } from '.';

export const userService = {
    getAll,
    getCurrent,
    editCurrent
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getCurrent() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users/myprofile`, requestOptions).then(handleResponse);
}

function editCurrent(body) {
    let headers = authHeader()
    headers["Content-Type"] = "application/json";
    const requestOptions = { method: 'PUT', headers, body: (JSON.stringify(body)) };

    return fetch(`${config.apiUrl}/users/myprofile/edit`, requestOptions).then(handleResponse);
}