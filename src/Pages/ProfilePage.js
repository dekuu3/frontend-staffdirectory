import React, { useEffect, useState } from 'react';

import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Fab, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
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
    const [phoneNo, setPhoneNo] = useState(currentUser.phoneNo);
    const [email, setEmail] = useState(currentUser.email);
    const [image, setImage] = useState(currentUser.image);

    const [isEditing, setEdit] = useState(false);

    const [first, setFirst] = useState(true);

    const classes = useStyles();

    // Reload user data on first render (to account for db changes)
    useEffect(() => {
        if (first) {

            userService.getCurrent().then(user => {
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setPhoneNo(user.phoneNo);
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
                <Grid container spacing={2} justify="center" alignItems="space-between">
                    <Grid item xs={12} sm={6}>
                        <Box p={5} className={classes.root}>
                            <div>
                                <TextField label="First Name" variant="filled" disabled={!isEditing} value={firstName} onChange={onChange(setFirstName, "firstName")} />
                                <TextField label="Last Name" variant="filled" disabled={!isEditing} value={lastName} onChange={onChange(setLastName, "lastName")} />
                            </div>
                            <div>
                                <TextField label="Phone No." variant="filled" disabled={!isEditing} value={phoneNo} onChange={onChange(setPhoneNo, "phoneNo")} />
                            </div>
                            <div>
                                <TextField label="Email" variant="filled" disabled={!isEditing} value={email} onChange={onChange(setEmail, "email")} />
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