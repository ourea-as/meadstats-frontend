import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Logout from './components/logout';
import { User } from './components/pages/user';
import Landing from './components/pages/landing';

export const Routes = ({ isAuthenticated, username, logoutUser }) => (
  <Switch>
    <Route
      exact
      path="/signout"
      render={() => <Logout logoutUser={logoutUser} />}
    />

    {isAuthenticated ? (
      <Route
        exact
        path="/"
        render={() => <Redirect to={`/user/${username}`} />}
      />
    ) : null}
    <Route
      exact
      path="/user/:name"
      render={({ match }) => <Redirect to={`/user/${match.params.name}/map`} />}
    />
    <Route
      path="/user/:name"
      render={({ match }) => (
        <User username={match.params.name} isAuthenticated={isAuthenticated} />
      )}
    />
    <Route exact path="/" component={Landing} />
  </Switch>
);

Routes.propTypes = {
  isAuthenticated: PropTypes.bool,
  username: PropTypes.string,
  logoutUser: PropTypes.func
};
