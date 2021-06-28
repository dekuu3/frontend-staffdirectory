import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';
import { authenticationService } from '.';

export const userService = {
    getAll,
    getCurrent,
    editCurrent,
    addNew,
    remove,
    edit
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

function addNew(user) {
    let headers = authHeader();
    headers["Content-Type"] = "application/json";
    const requestOptions = { method: 'POST', headers, body: (JSON.stringify(user)) };

    console.log(user);
    return fetch(`${config.apiUrl}/users/adduser`, requestOptions).then(handleResponse);
}

function remove(userId) {
    let headers = authHeader();
    headers["Content-Type"] = "application/json";
    const requestOptions = { method: 'DELETE', headers };

    console.log(userId);
    return fetch(`${config.apiUrl}/users/${userId}/delete`, requestOptions).then(handleResponse);
}

function edit(userId, user) {
    let headers = authHeader();
    headers["Content-Type"] = "application/json";
    const requestOptions = { method: 'PUT', headers, body: (JSON.stringify(user)) }

    return fetch(`${config.apiUrl}/users/${userId}/edit`, requestOptions).then(handleResponse);
}