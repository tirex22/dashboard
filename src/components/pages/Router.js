import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { Login, Devices } from './index'

const getCurrentPath = (url) => {
    const array = url.split('/')
    const path = array[array.length - 1]
    return path
}

export default function BasicExample() {

    const authenticated = JSON.parse(localStorage.getItem('account'))
    const path = getCurrentPath(window.location.href)

    const AuthRoute = ({ children, path }) => {
        return authenticated ?
            <Route path={path}>
                {children}
            </Route>
            :
            <Route path={path}>
                <Login />
            </Route>
    }

    if (!authenticated && path !== 'login') {
        window.location.href = '/login'
    }

    return (
        <Router>
            <Switch>
                <AuthRoute path="/login">
                    <Login />
                </AuthRoute>
                <AuthRoute path="/devices">
                    <Devices />
                </AuthRoute>
                <AuthRoute exact path="/">
                    <Devices />
                </AuthRoute>
            </Switch>
        </Router>
    );
}

