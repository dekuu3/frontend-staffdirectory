import React, { useEffect, useState } from 'react';

import { Avatar, Box, Button, Card, CardHeader, Grid, TextField } from '@material-ui/core';

import { authenticationService, userService } from '../_services';

function ProfilePage(props) {
    const currentUser = authenticationService.currentUserValue;

    const [phoneNo, setPhoneNo] = useState(currentUser.phoneNo);
    const [email, setEmail] = useState(currentUser.email);

    const [isEditing, setEdit] = useState(false);

    console.log(currentUser);

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
                            if (isEditing) {

                            }
                        }}>
                            {isEditing ? "Done" : "Edit"}
                        </Button>
                    }
                    title={currentUser.firstName + " " + currentUser.lastName}
                    subheader={currentUser.position} />
                <Box p={5}>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="stretch"
                        spacing={3}
                    >
                        <Grid item >
                            <TextField label="Phone No." variant={isEditing ? "standard" : "filled"} disabled={!isEditing} value={phoneNo} onChange={event => setPhoneNo(event.target.value)} />
                        </Grid>
                        <Grid item>
                            <TextField label="Email" variant={isEditing ? "standard" : "filled"} disabled={!isEditing} value={email} onChange={event => setEmail(event.target.value)} />
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </Box>)
}

export { ProfilePage };