import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Cookies, withCookies } from 'react-cookie';
import PropTypes from 'prop-types';

import jwt_decode from 'jwt-decode';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/favicon.ico';

import { Container, Row } from 'reactstrap';
import Topbar from './components/layout/topbar';
import { Footer } from './components/layout/footer';
import { ErrorBoundary } from './components/common/errorboundary';
import { Routes } from './routes';

class App extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;

    let isAuthenticated = false;
    let username = '';

    this.logoutUser = this.logoutUser.bind(this);

    if (cookies.get('jwt_token')) {
      this.loginUser(cookies.get('jwt_token'));
      cookies.remove('jwt_token');
    }

    if (window.localStorage.getItem('authToken')) {
      const decoded = jwt_decode(window.localStorage.getItem('authToken'));
      isAuthenticated = true;
      username = decoded.identity;
    } else {
      isAuthenticated = false;
    }

    this.state = {
      isAuthenticated,
      username
    };
  }

  logoutUser() {
    window.localStorage.clear();
    this.setState({ isAuthenticated: false });
  }

  loginUser(token) {
    window.localStorage.setItem('authToken', token);
    this.setState({ isAuthenticated: true });
  }

  render() {
    const { isAuthenticated, username } = this.state;

    return (
      <BrowserRouter>
        <main>
          <Topbar isAuthenticated={isAuthenticated} username={username} />
          <Container>
            <Row>
              <ErrorBoundary>
                <main role="main" className="col-md-12 col-lg-12 px-4">
                  <Routes
                    isAuthenticated={isAuthenticated}
                    username={username}
                    logoutUser={this.logoutUser}
                  />
                </main>
              </ErrorBoundary>
            </Row>
            <Footer />
          </Container>
        </main>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired
};

export default withCookies(App);
