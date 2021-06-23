import React from 'react';

import { TextField } from '@material-ui/core';

function MyTextField({ user: user, property: property, label: label, errors: errors, register: register, ...rest }) {
    return (<TextField
        variant="filled"
        defaultValue={user ? user[property] : ""}
        label={label}
        error={errors[property] != undefined}
        helperText={errors[property] && capitaliseFirstLetter(errors[property].message)}
        {...register(property)}
        {...rest}
    />)
}

const capitaliseFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export { MyTextField }