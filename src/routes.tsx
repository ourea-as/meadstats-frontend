import React, { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

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

export const AppRoutes: React.FC<RoutesProps> = (props) => {
  const { isAuthenticated, username, logoutUser } = props;

  return (
    <Routes>
      <Route path="/tasting">
        <Tasting />
      </Route>
      <Route path="/signout">
        <Logout logoutUser={logoutUser} />
      </Route>

      {isAuthenticated ? null : (
        <Route path="/">
          <Landing />
        </Route>
      )}

      <Route path="/">
        <Navigate to={`/user/${username}`} />
      </Route>

      {
        // TODO: Redirect to map
        /*<Route
        path="/user/:name"
        render={({ match }): ReactElement => <Navigate to={`/user/${match.params.name}/map`} />}
      />*/
      }
      <Route path="/user/:username/*" element={<User isAuthenticated={isAuthenticated} />} />
      <Navigate to="/" />
    </Routes>
  );
};
