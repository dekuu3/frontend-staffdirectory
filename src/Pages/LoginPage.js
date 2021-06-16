// React imports
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// Form validation imports
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

// UI imports
import { Button, Box, Card, Grid, TextField, Typography } from '@material-ui/core';

// Other file imports
import { authenticationService } from '@/_services';

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
})

function LoginPage(props) {
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
        mode: "all",
        resolver: yupResolver(schema)
    });

    const [loginFailed, setLoginFailed] = useState(false);

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
        props.history.push('/');
    }

    function onSubmit({ username, password }, e) {
        authenticationService.login(username, password)
            .then(
                user => {
                    const { from } = props.location.state || { from: { pathName: "/" } };
                },
                error => {
                    setLoginFailed(true);
                }
            )
    }


    return (
        <Grid container justify="center" spacing={3}>
            <Box p={3}>
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box py={1}>
                        <TextField name="username" label="Username" error={errors.username != undefined} helperText={errors.username && errors.username.message} variant="filled" {...register("username")} />
                    </Box>
                    <Box py={1}>
                        <TextField name="password" label="Password" error={errors.password != undefined} helperText={errors.password && errors.password.message} variant="filled" type="password" {...register("password")} />
                    </Box>
                    <Box py={1}>
                        <Button type="submit" variant="contained" disabled={isSubmitting}>Login</Button>
                        {isSubmitting &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
                    </Box>
                    {loginFailed && <div className={'alert alert-danger'}>Username or password is incorrect</div>}
                </form>
            </Box>
        </Grid>
    )

}

export { LoginPage };