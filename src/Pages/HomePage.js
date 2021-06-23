import React, { useEffect, useState } from "react";

import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import { Box, Typography } from "@material-ui/core";
import { Fab, Tooltip } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

import { userService, authenticationService } from "@/_services";
import { UserForm } from "../_components";

function HomePage(props) {
  const currentUser = authenticationService.currentUserValue;

  const [users, setUsers] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  })

  function makeSubtitle(user) {
    var subtitle;

    if (user.email) {
      subtitle = user.email;

      if (user.phoneNo) {
        subtitle += ", " + user.phoneNo;
      }
    }
    else if (user.phoneNo) {
      subtitle = user.phoneNo;
    }

    return (<React.Fragment>
      {subtitle}
    </React.Fragment>)
  }


  return (
    <div>
      <UserForm open={isAdding} onSubmit={setIsAdding} />
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
                  makeSubtitle(user)
                } />
                {(user.id != currentUser.id) && (currentUser.role == "Admin") && <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => userService.remove(user.id)} >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>}
              </ListItem>
            </Box>
          ))}
          {(currentUser.role == "Admin") &&
            <Box p={2} key={-1}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Tooltip title="Add User">
                      <Fab>
                        <Add onClick={() => setIsAdding(true)} />
                      </Fab>
                    </Tooltip>
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
            </Box>}
        </List>
      )}

    </div>
  );
}


export { HomePage };
