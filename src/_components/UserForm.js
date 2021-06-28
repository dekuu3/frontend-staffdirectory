import React, { useEffect, useState } from 'react';
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

    // These are the same regardless of if the user is adding/editing
    var defaultValues = { role: "User" };
    var schema = {
        firstName: yup.string().required("Name is required"),
        lastName: yup.string().required("Name is required"),
        username: yup.string().required("Username is required"),
        role: yup.string().required("Role is required"),
        position: yup.string().required("Position is required"),
        supervisor: yup.string(),
        email: yup.string().email().required("Email is required"),
    }

    // If the user is adding, a password is required
    if (props.type == "add") {
        schema.password = yup.string().required("Password is required").min(6)
    }

    // When the component is shown, check the type of operation being performed
    // And set the form values
    useEffect(() => {
        if (props.type == "edit" && !isDirty) {
            let user = props.user;

            setValue("firstName", user.firstName);
            setValue("lastName", user.lastName);
            setValue("username", user.username);
            setValue("position", user.position);
            setValue("supervisor", user.supervisor);
            setValue("email", user.email);

        } else {
        }
    })

    const { control, register, handleSubmit, formState: { errors, isSubmitting, isDirty, dirtyFields }, getValues, setValue } = useForm({
        mode: "all",
        resolver: yupResolver(yup.object().shape(schema)),
        defaultValues
    });

    // Submit based on op type
    function onSubmit(user, e) {
        console.log(user);

        if (props.type == "add") {
            userService.addNew(user)
                .then(
                    res => props.setOpen(false),
                    error => console.error(error)
                )
        }
        else {
            userService.edit(props.user.id, user)
                .then(
                    res => props.setOpen(false),
                    error => console.error(error)
                )
        }
    }

    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)}>
            <DialogTitle>
                {props.user ? props.user.firstName + " " + props.user.lastName : "New User"}
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item container direction="row" spacing={1}>
                            <Grid item>
                                <MyTextField control={control} required errors={errors} property="firstName" label="First Name" />
                            </Grid>
                            <Grid item>
                                <MyTextField control={control} required errors={errors} property="lastName" label="Last Name" />
                            </Grid>
                        </Grid>

                        <Grid item container direction="row" spacing={1}>
                            <Grid item>
                                <MyTextField control={control} required errors={errors} property="username" label="Username" />
                            </Grid>
                            <Grid item>
                                <MyTextField control={control} required errors={errors} property="email" label="E-Mail" />
                            </Grid>
                            {props.type == "add" && <Grid item>
                                <MyTextField control={control} required errors={errors} property="password" label="Password" type={showPassword ? "text" : "password"} InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>)
                                }} />
                            </Grid>}
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
                                <MyTextField control={control} errors={errors} property="supervisor" label="Supervisor" />
                            </Grid>
                            <Grid item>
                                <MyTextField control={control} required errors={errors} property="position" label="Position" />
                            </Grid>
                        </Grid>

                        <Grid item container direction="row" spacing={1}>
                            <Grid item>
                                <Button type="submit" variant="contained" disabled={isSubmitting}>{props.type == "add" ? "Add User" : "Submit Changes"}</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export { UserForm }