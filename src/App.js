import React, { useEffect, useState } from 'react';
import { Router, Route, Link, withRouter } from 'react-router-dom';

import { AppBar, Button, makeStyles, Toolbar } from '@material-ui/core';

import { history } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage, LoginPage } from '@/Pages';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    navButtonLeft: {
        marginLeft: theme.spacing(2)
    },
    navButtonRight: {
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
    })

    function logout() {
        authenticationService.logout();
        props.history.push('/login');
    }

    const classes = useStyles();

    return (
        <Router history={history}>
            <div className={classes.root}>
                {(currentUser != null) &&
                    <AppBar position="static">
                        <Toolbar>
                            <Button
                                edge="start"
                                className={classes.navButtonLeft}
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => { props.history.replace('/') }}
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
                        </Toolbar>
                    </AppBar>
                }
                <div className="jumbotron">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );

}

export default withRouter(App)