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
      <Route path="/tasting" element={<Tasting />} />
      <Route path="/signout" element={<Logout logoutUser={logoutUser} />} />

      {isAuthenticated ? null : <Route path="/" element={<Landing />} />}

      <Route path="/" element={<Navigate to={`/user/${username}`} />} />

      <Route path="/user/:username/*" element={<User isAuthenticated={isAuthenticated} />} />
    </Routes>
  );
};
