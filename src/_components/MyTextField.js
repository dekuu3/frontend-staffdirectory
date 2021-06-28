import React from 'react';
import { Controller } from 'react-hook-form';

import { TextField } from '@material-ui/core';
import { Reply } from '@material-ui/icons';

function OldMyTextField({ property: property, label: label, errors: errors, register: register, ...rest }) {
    return (<TextField
        variant="filled"
        label={label}
        error={errors[property] != undefined}
        helperText={errors[property] && capitaliseFirstLetter(errors[property].message)}
        {...register(property)}
        {...rest}
    />)
}

function MyTextField({ control, rules, label, errors, property, ...rest }) {
    return (<Controller
        control={control}
        name={property}
        render={({ field }) => (
            <TextField
                variant="filled"
                label={label}
                {...field}
                error={errors[property] != undefined}
                helperText={errors[property] && capitaliseFirstLetter(errors[property].message)}
                {...rest}
            />
        )}
        rules={rules}

    ></Controller>)
}

const capitaliseFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export { MyTextField }