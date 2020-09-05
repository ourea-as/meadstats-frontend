import React, { useState, useEffect, ReactElement, useCallback } from 'react';
import { Route, Routes, NavLink, useParams, Navigate } from 'react-router-dom';

import { Nav, NavItem, Row } from 'reactstrap';

import axios from 'axios';
import socketIOClient from 'socket.io-client';
import { User as IUser } from '../types';

import { API_ROOT } from '../api/api-config';

import { ErrorBoundary } from './errorboundary';

import './user.css';

import { Profile } from './profile';
import { Loading } from './loading';

const PatternsSuspense = React.lazy(() => import(/* webpackChunkName: "patterns" */ './patterns'));

const Patterns = (props): ReactElement => (
  <React.Suspense fallback={<Loading />}>
    <PatternsSuspense {...props} />
  </React.Suspense>
);

const FriendsSuspense = React.lazy(() => import(/* webpackChunkName: "friends" */ './friends'));

const Friends = (props): ReactElement => (
  <React.Suspense fallback={<Loading />}>
    <FriendsSuspense {...props} />
  </React.Suspense>
);

const MapSuspense = React.lazy(() => import(/* webpackChunkName: "map" */ './map'));

const Map = (props): ReactElement => (
  <React.Suspense fallback={<Loading />}>
    <MapSuspense {...props} />
  </React.Suspense>
);

const CountryMapSuspense = React.lazy(() => import(/* webpackChunkName: "countrymap" */ './countrymap'));

const CountryMap = (props): ReactElement => (
  <React.Suspense fallback={<Loading />}>
    <CountryMapSuspense {...props} />
  </React.Suspense>
);

interface UserProps {
  isAuthenticated: boolean;
}

export const User: React.FunctionComponent<UserProps> = (props) => {
  const { isAuthenticated } = props;

  const { username } = useParams();

  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [exist, setExist] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);
  const [updateTotal, setUpdateTotal] = useState(0);
  const [socket, setSocket] = useState<any>(null);

  const loadUser = useCallback((username) => {
    axios
      .get(`${API_ROOT}/v1/users/${username}`)
      .then(({ data }) => {
        const dataUser = data.data.user;
        setLoading(false);
        setUser({
          avatar: dataUser.avatar,
          avatarHd: dataUser.avatar_hd,
          firstName: dataUser.first_name,
          id: dataUser.id,
          lastName: dataUser.last_name,
          lastUpdate: dataUser.last_update,
          totalBadges: dataUser.total_badges,
          totalBeers: dataUser.total_beers,
          totalCheckins: dataUser.total_checkins,
          totalFriends: dataUser.total_friends,
          userName: dataUser.user_name,
        });
      })
      .catch(({ error }) => {
        setExist(false);
        setUser({
          avatar:
            'https://gravatar.com/avatar/dda81c541d804f53148efea3b4eec136?size=100&d=https%3A%2F%2Funtappd.akamaized.net%2Fsite%2Fassets%2Fimages%2Fdefault_avatar_v3_gravatar.jpg%3Fv%3D2',
          avatarHd:
            'https://gravatar.com/avatar/dda81c541d804f53148efea3b4eec136?size=100&d=https%3A%2F%2Funtappd.akamaized.net%2Fsite%2Fassets%2Fimages%2Fdefault_avatar_v3_gravatar.jpg%3Fv%3D2',
          firstName: '',
          id: 0,
          lastName: '',
          lastUpdate: null,
          totalBadges: 0,
          totalBeers: 0,
          totalCheckins: 0,
          totalFriends: 0,
          userName: username,
        });
        setLoading(false);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (username) loadUser(username);
  }, [username, loadUser]);

  const handleUpdateProgress = (data) => {
    setUpdateCount(data.progress);
    setUpdateTotal(data.total);
  };

  const handleUpdateFinished = () => {
    setUpdateCount(0);
    setUpdateTotal(0);
    setUpdating(false);

    if (socket !== null) {
      socket.close();
      setSocket(null);
    }

    loadUser(username);
  };

  const updateUser = () => {
    const token = window.localStorage.getItem('authToken') || null;

    const socket = socketIOClient(`${API_ROOT}`);
    setSocket(socket);
    socket.on('update:progress', handleUpdateProgress);
    socket.on('update:finished', handleUpdateFinished);

    socket.emit('update', { token, username: user?.userName });
    setUpdating(true);
  };

  return (
    <>
      <Profile
        user={user}
        updating={updating}
        count={updateCount}
        total={updateTotal}
        updateUser={updateUser}
        exist={exist}
        isAuthenticated={isAuthenticated}
      />
      {loading || user === undefined ? (
        <Loading />
      ) : exist && user.lastUpdate !== null ? (
        <ErrorBoundary>
          <UserNavigation user={user} />
          <Row>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Navigate to={`map`} />} />
                <Route path="map/:country/*" element={<CountryMap user={user} />} />
                <Route path="map/*" element={<Map user={user} />} />
                <Route path="patterns/*" element={<Patterns user={user} />} />
                <Route path="friends/*" element={<Friends user={user} />} />
              </Routes>
            </ErrorBoundary>
          </Row>
        </ErrorBoundary>
      ) : (
        <div className="user-not-exist">This user does not exist in the database. Please refresh.</div>
      )}
    </>
  );
};

const UserNavigation = ({ user }): ReactElement => (
  <Nav pills horizontal="center" className="user-tabs">
    <UserNavigationTab text="Map" route="map" user={user} />
    <UserNavigationTab text="Patterns" route="patterns" user={user} />
    <UserNavigationTab text="Friends" route="friends" user={user} />
  </Nav>
);

const UserNavigationTab = ({ text, route, user }): ReactElement => (
  <NavLink className="user-nav-tab" activeClassName="active" to={`${route}`}>
    <NavItem>
      <span className="nav-link user-nav-link">{text}</span>
    </NavItem>
  </NavLink>
);
