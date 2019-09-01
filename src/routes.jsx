import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Logout from './components/logout';
import { User } from './components/user';
import Landing from './components/landing';

export const Routes = ({ isAuthenticated, username, logoutUser }) => (
  <Switch>
    <Route exact path="/signout" render={() => <Logout logoutUser={logoutUser} />} />

    {isAuthenticated ? null : <Route exact path="/" component={Landing} />}

    <Route exact path="/" render={() => <Redirect to={`/user/${username}`} />} />

    <Route exact path="/user/:name" render={({ match }) => <Redirect to={`/user/${match.params.name}/map`} />} />
    <Route
      path="/user/:name"
      render={({ match }) => <User username={match.params.name} isAuthenticated={isAuthenticated} />}
    />
  </Switch>
);

Routes.propTypes = {
  isAuthenticated: PropTypes.bool,
  username: PropTypes.string,
  logoutUser: PropTypes.func,
};
