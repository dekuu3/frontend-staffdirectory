import React, { useEffect, useState } from 'react';


import { Box, Button, Card, CardContent, CardMedia, CardHeader, Grid, makeStyles, TextField } from '@material-ui/core';
import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { authenticationService, userService } from '../_services';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch'
        }
    }
}))

function ProfilePage(props) {
    const currentUser = authenticationService.currentUserValue;

    const [firstName, setFirstName] = useState(currentUser.firstName);
    const [lastName, setLastName] = useState(currentUser.lastName);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(currentUser.email);
    const [image, setImage] = useState(currentUser.image);

    const [isEditing, setEdit] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [first, setFirst] = useState(true);

    const classes = useStyles();

    // Reload user data on first render (to account for db changes)
    useEffect(() => {
        if (first) {

            userService.getCurrent().then(user => {
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);

                if (user.image) {
                    setImage(user.image);
                }

            });
            setFirst(false);
        }
    });

    function handleUploadClick(event) {
        console.log(event);

        userService.editImage(event.target.files[0]).then(res => setImage(res.url));
    };

    function onChange(setter, changedProperty) {

        return (event => {
            setter(event.target.value);
            userService.editCurrent({ [changedProperty]: event.target.value });
        })
    }

    return (
        <Box m={3}>
            <Card>
                <CardHeader
                    action={
                        <Button onClick={() => {
                            setEdit(!isEditing);
                        }}>
                            {isEditing ? "Done" : "Edit"}
                        </Button>
                    }
                    title={firstName + " " + lastName}
                    subheader={currentUser.position} />
                <Grid container spacing={2} justify="center" alignItems="flex-start">
                    <Grid item xs={12} sm={6}>
                        <Box p={5} className={classes.root}>
                            <div>
                                <TextField label="First Name" variant="filled" InputProps={{ readOnly: !isEditing }} value={firstName} onChange={onChange(setFirstName, "firstName")} />
                                <TextField label="Last Name" variant="filled" InputProps={{ readOnly: !isEditing }} value={lastName} onChange={onChange(setLastName, "lastName")} />
                            </div>
                            <div>
                                <TextField label="New Password" variant="filled" type={showPassword ? "text" : "password"} value={password} onChange={onChange(setPassword, "password")} InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>),
                                    readOnly: !isEditing
                                }} />
                            </div>
                            <div>
                                <TextField label="Email" variant="filled" InputProps={{ readOnly: !isEditing }} value={email} onChange={onChange(setEmail, "email")} />
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card>
                            {image && <CardMedia
                                image={image}
                                style={{
                                    height: 140,
                                    paddingTop: '52.25%', // 16:9,
                                    marginTop: '30'
                                }} />
                            }
                            <CardContent>

                                <Button
                                    variant="contained"
                                    component="label"
                                >
                                    Upload File
                                    <input
                                        accept="image/*"
                                        id="contained-button-file"
                                        type="file"
                                        onChange={handleUploadClick}
                                        hidden
                                    />
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Card>
        </Box >)
}

export { ProfilePage };