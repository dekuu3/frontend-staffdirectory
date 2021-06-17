import React, { useEffect, useState } from "react";

import { Avatar, List, ListItem, ListItemText, ListItemAvatar, Snackbar, Typography, Box } from "@material-ui/core";
import { Alert } from '@material-ui/lab';

import { userService, authenticationService } from "@/_services";

function HomePage(props) {
  const [users, setUsers] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  })

  return (
    <div>
      <Box px={3} pt={3}>
        <Typography variant="h4" m={4}>Users:</Typography>
      </Box>
      {users && (
        <List height={400} width={300}>
          {users.map((user, index) => (
            <Box p={2} key={index}>
              <ListItem divider={true}>
                <ListItemAvatar>
                  <Avatar alt={user.firstName + " " + user.lastName + "'s Avatar"} src="../../img/profile-user.png" />
                </ListItemAvatar>
                <ListItemText primary={user.firstName + " " + user.lastName} secondary={
                  user.email && user.phoneNo &&
                  <React.Fragment>
                    {user.email} <br />
                    {user.phoneNo}
                  </React.Fragment>
                } />
              </ListItem>
            </Box>
          ))}
        </List>
      )}
      <Snackbar open={isError} autoHideDuration={2000} onClose={() => setIsError(false)}>
        <Alert elevation={6} variant="filled" severity="error">You are not authorised to access that page</Alert>
      </Snackbar >
    </div>
  );
}


export { HomePage };
