import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Logout from './components/logout';
import { User } from './components/user';
import Landing from './components/landing';
import { Tasting } from './components/tasting';

type RoutesProps = {
  isAuthenticated: boolean;
  username: string;
  logoutUser: () => void;
};

export const Routes: React.FC<RoutesProps> = props => {
  const { isAuthenticated, username, logoutUser } = props;

  return (
    <Switch>
      <Route exact path="/tasting" render={(): JSX.Element => <Tasting />} />
      <Route exact path="/signout" render={(): JSX.Element => <Logout logoutUser={logoutUser} />} />

      {isAuthenticated ? null : <Route exact path="/" component={Landing} />}

      <Route exact path="/" render={(): JSX.Element => <Redirect to={`/user/${username}`} />} />

      <Route
        exact
        path="/user/:name"
        render={({ match }): JSX.Element => <Redirect to={`/user/${match.params.name}/map`} />}
      />
      <Route
        path="/user/:name"
        render={({ match }): JSX.Element => <User username={match.params.name} isAuthenticated={isAuthenticated} />}
      />
      <Redirect to="/" />
    </Switch>
  );
};
