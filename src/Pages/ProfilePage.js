import React, { useEffect, useState } from 'react';

import { Avatar, Box, Button, Card, CardHeader, Grid, makeStyles, TextField } from '@material-ui/core';

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

    const [isEditing, setEdit] = useState(false);

    const classes = useStyles();

    function onChange(setter, changedProperty) {
        let body = currentUser;

        return (event => {
            setter(event.target.value);
            body[changedProperty] = event.target.value;
            userService.editCurrent(body);
        })
    }

    return (
        <Box m={3}>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar aria-label="profile" src="../../img/profile-user.png" />
                    }
                    action={
                        <Button onClick={() => {
                            setEdit(!isEditing);
                        }}>
                            {isEditing ? "Done" : "Edit"}
                        </Button>
                    }
                    title={firstName + " " + lastName}
                    subheader={currentUser.position} />
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
            </Card>
        </Box>)
}

export { ProfilePage };