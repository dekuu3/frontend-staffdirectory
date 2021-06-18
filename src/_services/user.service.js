import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const userService = {
    getAll,
    editCurrent
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function editCurrent(body) {
    console.log(body);
    const requestOptions = { method: 'PUT', headers: authHeader(), body: (JSON.stringify(body)) };
    return fetch(`${config.apiUrl}/users/myprofile/edit`, requestOptions).then(handleResponse);
}