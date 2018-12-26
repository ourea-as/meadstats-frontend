import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavLink, Row } from 'reactstrap';

import axios from 'axios';
import socketIOClient from 'socket.io-client';

import { API_ROOT } from '../api/api-config';

import { ErrorBoundary } from './errorboundary';

import './user.css';

import { Profile } from './profile';
import { Loading } from './loading';

const PatternsSuspense = React.lazy(() =>
  import(/* webpackChunkName: "patterns" */ './patterns')
);

const Patterns = props => (
  <React.Suspense fallback={<Loading />}>
    <PatternsSuspense {...props} />
  </React.Suspense>
);

const MapSuspense = React.lazy(() =>
  import(/* webpackChunkName: "map" */ './map')
);

const Map = props => (
  <React.Suspense fallback={<Loading />}>
    <MapSuspense {...props} />
  </React.Suspense>
);

const CountryMapSuspense = React.lazy(() =>
  import(/* webpackChunkName: "countrymap" */ './countrymap')
);

const CountryMap = props => (
  <React.Suspense fallback={<Loading />}>
    <CountryMapSuspense {...props} />
  </React.Suspense>
);

export class User extends React.Component {
  constructor(props) {
    super(props);

    this.updateUser = this.updateUser.bind(this);
    this.loadUserData = this.loadUserData.bind(this);
    this.handleUpdateProgress = this.handleUpdateProgress.bind(this);
    this.handleUpdateFinished = this.handleUpdateFinished.bind(this);

    this.state = {
      user: {
        user_name: '',
        avatar: ''
      },
      updating: false,
      loading: true,
      exist: true,
      updatecount: 0,
      updatetotal: 0,
      prevUsername: ''
    };
  }

  handleUpdateProgress(data) {
    this.setState({
      updatecount: data.progress,
      updatetotal: data.total
    });
  }

  handleUpdateFinished() {
    this.setState({
      updatecount: 0,
      updatetotal: 0,
      loading: false,
      exist: true,
      updating: false
    });

    this.socket.close();
    this.loadUserData();
  }

  componentDidMount() {
    this.loadUserData();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.username !== prevState.prevUsername) {
      return {
        prevUsername: nextProps.username,
        user: {
          user_name: nextProps.username
        },
        loading: true,
        exist: true
      };
    }

    return null;
  }

  componentDidUpdate() {
    const { loading } = this.state;

    if (loading) {
      this.loadUserData();
    }
  }

  loadUserData() {
    const { prevUsername } = this.state;

    axios
      .get(`${API_ROOT}/v1/users/${prevUsername}`)
      .then(({ data }) => {
        this.setState({
          updating: false,
          loading: false,
          user: data.data.user
        });
      })
      .catch(({ error }) => {
        this.setState({
          updating: false,
          loading: false,
          exist: false
        });
      });
  }

  updateUser() {
    const { username } = this.props;

    const token = window.localStorage.getItem('authToken') || null;

    this.socket = socketIOClient(`${API_ROOT}`);
    this.socket.on('update:progress', this.handleUpdateProgress);
    this.socket.on('update:finished', this.handleUpdateFinished);

    this.socket.emit('update', { token, username });
    this.setState({
      updating: true
    });
  }

  render() {
    const {
      updatecount,
      updatetotal,
      updating,
      loading,
      exist,
      user,
      prevUsername
    } = this.state;

    return loading ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Profile
          user={user}
          updating={updating}
          count={updatecount}
          total={updatetotal}
          updateUser={this.updateUser}
          exist={exist}
          isAuthenticated={this.props.isAuthenticated}
        />
        {exist ? (
          <ErrorBoundary>
            <UserNavigation user={user.user_name || prevUsername} />
            <Row>
              <ErrorBoundary>
                <Switch>
                  <Route
                    path="/user/:name/map/:country"
                    render={({ match }) => (
                      <CountryMap
                        username={user.user_name}
                        country={match.params.country}
                      />
                    )}
                  />
                  <Route
                    path="/user/:name/map"
                    render={() => <Map username={user.user_name} />}
                  />
                  <Route
                    path="/user/:name/patterns"
                    render={() => <Patterns username={user.user_name} />}
                  />
                </Switch>
              </ErrorBoundary>
            </Row>
          </ErrorBoundary>
        ) : null}
      </React.Fragment>
    );
  }
}

User.propTypes = {
  username: PropTypes.string
};

const UserNavigation = ({ user }) => (
  <Nav pills horizontal="center" className="user-tabs">
    <UserNavigationTab text="Map" route="map" user={user} />
    <UserNavigationTab text="Patterns" route="patterns" user={user} />
  </Nav>
);

UserNavigation.propTypes = {
  user: PropTypes.string
};

const UserNavigationTab = ({ text, route, user }) => (
  <LinkContainer activeClassName="active" exact to={`/user/${user}/${route}`}>
    <NavItem>
      <NavLink>{text}</NavLink>
    </NavItem>
  </LinkContainer>
);

UserNavigationTab.propTypes = {
  text: PropTypes.string,
  route: PropTypes.string,
  user: PropTypes.string
};
