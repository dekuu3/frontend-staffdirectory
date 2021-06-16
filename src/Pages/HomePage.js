import React, { useEffect, useState } from "react";

import { Avatar, List, ListItem, ListItemText, ListItemAvatar, Typography, Box } from "@material-ui/core";

import { userService, authenticationService } from "@/_services";

function HomePage(props) {
  const [users, setUsers] = useState(null);

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
                  <Avatar alt={user.firstName + " " + user.lastName} src="../../img/profile-user.png" />
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
    </div>
  );
}


export { HomePage };
