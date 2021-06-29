import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const userService = {
    getAll,
    getCurrent,
    editCurrent,
    editImage,
    addNew,
    remove,
    edit
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };

    //console.log("Getting all users");
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getCurrent() {
    const requestOptions = { method: 'GET', headers: authHeader() };

    //console.log("Getting current user info");
    return fetch(`${config.apiUrl}/users/myprofile`, requestOptions).then(handleResponse);
}

function editCurrent(body) {
    let headers = authHeader()
    headers["Content-Type"] = "application/json";
    const requestOptions = { method: 'PUT', headers, body: (JSON.stringify(body)) };

    //console.log("Editing current user info", body);
    return fetch(`${config.apiUrl}/users/myprofile/edit`, requestOptions).then(handleResponse);
}

function editImage(file) {
    let headers = authHeader();

    const formData = new FormData();
    formData.append(
        "file",
        file
    );

    const requestOptions = { method: 'POST', headers, body: formData };

    //console.log("Editing current user image");
    return fetch(`${config.apiUrl}/users/myprofile/edit/image`, requestOptions).then(handleResponse);
}

function addNew(user) {
    let headers = authHeader();
    headers["Content-Type"] = "application/json";
    const requestOptions = { method: 'POST', headers, body: (JSON.stringify(user)) };

    //console.log("Adding new user", user);
    return fetch(`${config.apiUrl}/users/adduser`, requestOptions).then(handleResponse);
}

function remove(userId) {
    let headers = authHeader();
    headers["Content-Type"] = "application/json";
    const requestOptions = { method: 'DELETE', headers };

    //console.log("Removing user by id", userId);
    return fetch(`${config.apiUrl}/users/${userId}/delete`, requestOptions).then(handleResponse);
}

function edit(userId, user) {
    let headers = authHeader();
    headers["Content-Type"] = "application/json";
    const requestOptions = { method: 'PUT', headers, body: (JSON.stringify(user)) }

    //console.log("Editing user by id", user, userId);
    return fetch(`${config.apiUrl}/users/${userId}/edit`, requestOptions).then(handleResponse);
}