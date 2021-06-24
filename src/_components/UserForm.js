import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Avatar, Button, Grid, MenuItem, InputAdornment, IconButton, TextField } from "@material-ui/core";
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { userService } from '../_services';
import { MyTextField } from './MyTextField';

function UserForm(props) {
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        mode: "all",
        resolver: yupResolver(yup.object().shape({
            firstName: yup.string().required("Name is required"),
            lastName: yup.string().required("Name is required"),
            username: yup.string().required("Username is required"),
            password: yup.string().required("Password is required").min(6),
            role: yup.string().required("Role is required"),
            position: yup.string().required("Position is required"),
            supervisor: yup.string(),
            email: yup.string().email().required("Email is required"),

        }))
    });

    function onSubmit(user, e) {
        console.log(user);
        userService.addNew(user)
            .then(
                res => props.setOpen(false),
                error => console.log(error)
            )
    }

    return (<Dialog open={props.open} onClose={() => props.setOpen(false)}>
        <DialogTitle>
            {props.user ? props.user.firstName + " " + props.user.lastName : "New User"}
        </DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" spacing={1}>
                    <Grid item container direction="row" spacing={1}>
                        <Grid item>
                            <MyTextField required errors={errors} user={props.user} property="firstName" label="First Name" register={register} />
                        </Grid>
                        <Grid item>
                            <MyTextField required errors={errors} user={props.user} property="lastName" label="Last Name" register={register} />
                        </Grid>
                    </Grid>

                    <Grid item container direction="row" spacing={1}>
                        <Grid item>
                            <MyTextField required errors={errors} user={props.user} property="username" label="Username" register={register} />
                        </Grid>
                        <Grid item>
                            <MyTextField required errors={errors} user={props.user} property="email" label="E-Mail" register={register} />
                        </Grid>
                        <Grid item>
                            <MyTextField required errors={errors} user={props.user} property="password" label="Password" register={register} type={showPassword ? "text" : "password"} InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>)
                            }} />
                        </Grid>
                    </Grid>

                    <Grid item container direction="row" spacing={1}>
                        <Grid item>
                            <TextField
                                required
                                select
                                variant="filled"
                                label="Role"
                                {...register("role")}
                                defaultValue="User">
                                {["User", "Admin"].map((roleOption => (
                                    <MenuItem key={roleOption} value={roleOption}>
                                        {roleOption}
                                    </MenuItem>
                                )))}
                            </TextField>
                        </Grid>
                        <Grid item>
                            <MyTextField errors={errors} user={props.user} property="supervisor" label="Supervisor" register={register} />
                        </Grid>
                        <Grid item>
                            <MyTextField required errors={errors} user={props.user} property="position" label="Position" register={register} />
                        </Grid>
                    </Grid>

                    <Grid item container direction="row" spacing={1}>
                        <Grid item>
                            <Button type="submit" variant="contained" disabled={isSubmitting}>Add User</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </DialogContent>
    </Dialog>
    )
}

export { UserForm }