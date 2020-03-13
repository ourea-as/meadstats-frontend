import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

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

const Patterns = (props): JSX.Element => (
  <React.Suspense fallback={<Loading />}>
    <PatternsSuspense {...props} />
  </React.Suspense>
);

const FriendsSuspense = React.lazy(() => import(/* webpackChunkName: "friends" */ './friends'));

const Friends = (props): JSX.Element => (
  <React.Suspense fallback={<Loading />}>
    <FriendsSuspense {...props} />
  </React.Suspense>
);

const MapSuspense = React.lazy(() => import(/* webpackChunkName: "map" */ './map'));

const Map = (props): JSX.Element => (
  <React.Suspense fallback={<Loading />}>
    <MapSuspense {...props} />
  </React.Suspense>
);

const CountryMapSuspense = React.lazy(() => import(/* webpackChunkName: "countrymap" */ './countrymap'));

const CountryMap = (props): JSX.Element => (
  <React.Suspense fallback={<Loading />}>
    <CountryMapSuspense {...props} />
  </React.Suspense>
);

interface UserProps {
  isAuthenticated: boolean;
  username: string;
}

export const User: React.FunctionComponent<UserProps> = props => {
  const { isAuthenticated, username } = props;

  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [exist, setExist] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);
  const [updateTotal, setUpdateTotal] = useState(0);
  const [socket, setSocket] = useState<any>(null);

  const loadUser = useCallback(() => {
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
        setLoading(false);
        console.error(error);
      });
  }, [username]);

  useEffect(() => {
    if (user === undefined && loading === false) loadUser();
  }, [username, loading, loadUser, user]);

  const handleUpdateProgress = useCallback(data => {
    console.log('Progress!');
    setUpdateCount(data.progress);
    setUpdateTotal(data.total);
  }, []);

  const handleUpdateFinished = useCallback(() => {
    console.log('Finished!');
    setUpdateCount(0);
    setUpdateTotal(0);
    setUpdating(false);

    if (socket !== null) {
      console.log('Closing');
      socket.close();
      setSocket(null);
    }

    loadUser();
  }, [loadUser, socket]);

  const updateUser = useCallback(() => {
    const token = window.localStorage.getItem('authToken') || null;

    const socket = socketIOClient(`${API_ROOT}`);
    setSocket(socket);
    socket.on('update:progress', handleUpdateProgress);
    socket.on('update:finished', handleUpdateFinished);
    console.log(user);

    socket.emit('update', { token, username: user?.userName });
    setUpdating(true);
  }, [user, handleUpdateFinished, handleUpdateProgress]);

  return loading || user === undefined ? (
    <Loading />
  ) : (
    <React.Fragment>
      <Profile
        user={user}
        updating={updating}
        count={updateCount}
        total={updateTotal}
        updateUser={updateUser}
        exist={exist}
        isAuthenticated={isAuthenticated}
      />
      {exist && user.lastUpdate !== null ? (
        <ErrorBoundary>
          <UserNavigation user={user.userName} />
          <Row>
            <ErrorBoundary>
              <Switch>
                <Route
                  path="/user/:name/map/:country"
                  render={({ match }): JSX.Element => (
                    <CountryMap username={user.userName} country={match.params.country} />
                  )}
                />
                <Route path="/user/:name/map" render={(): JSX.Element => <Map username={user.userName} />} />
                <Route path="/user/:name/patterns" render={(): JSX.Element => <Patterns username={user.userName} />} />
                <Route path="/user/:name/friends" render={(): JSX.Element => <Friends username={user.userName} />} />
              </Switch>
            </ErrorBoundary>
          </Row>
        </ErrorBoundary>
      ) : (
        <div className="user-not-exist">This user does not exist in the database. Please refresh.</div>
      )}
    </React.Fragment>
  );
};

const UserNavigation = ({ user }): JSX.Element => (
  <Nav pills horizontal="center" className="user-tabs">
    <UserNavigationTab text="Map" route="map" user={user} />
    <UserNavigationTab text="Patterns" route="patterns" user={user} />
    <UserNavigationTab text="Friends" route="friends" user={user} />
  </Nav>
);

const UserNavigationTab = ({ text, route, user }): JSX.Element => (
  <NavLink className="user-nav-tab" activeClassName="active" to={`/user/${user}/${route}`}>
    <NavItem>
      <span className="nav-link user-nav-link">{text}</span>
    </NavItem>
  </NavLink>
);
