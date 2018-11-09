import { Meteor }from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

window.browserHistory = browserHistory;

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = () => {
    if (Meteor.userId()) {
        browserHistory.replace('/links');
    }
};
const onEnterPrivatePage = () => {
    if (!Meteor.userId()) {
        browserHistory.replace('/');
    }
};
export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPage && isAuthenticated) {
        browserHistory.replace('/links');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        browserHistory.replace('/')
    }
};

export const routes = (
    <Router history={browserHistory}>
        <Router path="/" component={Login} onEnter={onEnterPublicPage}/>
        <Router path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
        <Router path="/links" component={Link} onEnter={onEnterPrivatePage}/>
        <Router path="*" component={NotFound} onEnter={onEnterPrivatePage}/>
    </Router>
);