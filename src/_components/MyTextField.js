import React from 'react';
import { Controller } from 'react-hook-form';

import { TextField } from '@material-ui/core';

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
    />)
}

const capitaliseFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export { MyTextField }