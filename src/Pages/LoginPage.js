// React imports
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// Form validation imports
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

// UI imports
import { Backdrop, Button, Box, Grid, TextField, Typography, CircularProgress } from '@material-ui/core';

// Other file imports
import { authenticationService } from '@/_services';

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
})

function LoginPage(props) {
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitted } } = useForm({
        mode: "all",
        resolver: yupResolver(schema)
    });

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
        props.history.push('/');
    }

    function onSubmit({ username, password }, e) {
        authenticationService.login(username, password)
            .then(
                user => {
                    const { from } = props.location.state || { from: { pathName: "/" } };
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

                        <Backdrop open={isSubmitting}><CircularProgress /></Backdrop>

                    </Box>
                    {isSubmitted && <Typography>Username or password is incorrect</Typography>}
                </form>
            </Box>
        </Grid>
    )

}

export { LoginPage };