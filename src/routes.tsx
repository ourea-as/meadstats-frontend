import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Logout from './components/logout';
import { User } from './components/user';
import { Tasting } from './components/tasting';
import { Loading } from './components/loading';

const LandingSuspense = React.lazy(() => import(/* webpackChunkName: "landing" */ './components/landing'));

const Landing = (props): ReactElement => (
  <React.Suspense fallback={<Loading />}>
    <LandingSuspense {...props} />
  </React.Suspense>
);

type RoutesProps = {
  isAuthenticated: boolean;
  username: string;
  logoutUser: () => void;
};

export const Routes: React.FC<RoutesProps> = (props) => {
  const { isAuthenticated, username, logoutUser } = props;

  return (
    <Switch>
      <Route exact path="/tasting" render={(): ReactElement => <Tasting />} />
      <Route exact path="/signout" render={(): ReactElement => <Logout logoutUser={logoutUser} />} />

      {isAuthenticated ? null : <Route exact path="/" component={Landing} />}

      <Route exact path="/" render={(): ReactElement => <Redirect to={`/user/${username}`} />} />

      <Route
        exact
        path="/user/:name"
        render={({ match }): ReactElement => <Redirect to={`/user/${match.params.name}/map`} />}
      />
      <Route
        path="/user/:name"
        render={({ match }): ReactElement => <User username={match.params.name} isAuthenticated={isAuthenticated} />}
      />
      <Redirect to="/" />
    </Switch>
  );
};
