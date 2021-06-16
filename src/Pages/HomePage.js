import React from "react";

import { Avatar, Divider, List, ListItem, ListItemText, ListItemAvatar } from "@material-ui/core";

import { userService, authenticationService } from "@/_services";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
      users: null,
    };
  }

  componentDidMount() {
    userService.getAll().then((users) => this.setState({ users }));
  }

  render() {
    const { currentUser, users } = this.state;
    return (
      <div>
        <h1>Hi {currentUser.firstName}!</h1>
        <p>You're logged in!</p>
        <h3>Users list:</h3>
        {users && (
          <List height={400} width={300}>
            {users.map((user, index) => (
              <span key={index}>
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
              </span>
            ))}
          </List>
        )}
      </div>
    );
  }
}

export { HomePage };
