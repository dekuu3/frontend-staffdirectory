import React, { useEffect, useState } from 'react';
import { Router, Route, Switch, withRouter } from 'react-router-dom';

import { AppBar, Button, Container, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons'

import { history } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage, LoginPage, ProfilePage } from '@/Pages';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    navButtonLeft: {
        marginLeft: theme.spacing(2)
    },
    navButtonRight: {
        marginLeft: "auto",
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

function App(props) {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        authenticationService.currentUser.subscribe(x => setCurrentUser(x));
    });

    function logout() {
        authenticationService.logout();
        props.history.push('/login');
    }

    const classes = useStyles();

    return (
        <Router history={history}>
            {(currentUser != null) &&
                <AppBar position="static">
                    <Toolbar>
                        <Button
                            edge="start"
                            className={classes.navButtonLeft}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => { history.replace('/') }}
                        >
                            Home
                        </Button>
                        <Button
                            edge="start"
                            className={classes.navButtonLeft}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                        <IconButton
                            edge="end"
                            className={classes.navButtonRight}
                            aria-label="account of current user"
                            aria-controls="appbar-account"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={() => history.replace("/user/profile")}
                        >
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            }
            <Container fixed>
                <Switch>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <PrivateRoute path="/user/profile" component={ProfilePage} />
                    <Route path="/login" component={LoginPage} />
                </Switch>
            </Container>
        </Router>
    );
}

export default withRouter(App)