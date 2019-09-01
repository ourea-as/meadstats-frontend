import React from 'react';
import { Cookies, withCookies } from 'react-cookie';
import PropTypes from 'prop-types';

import jwtDecode from 'jwt-decode';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/favicon.ico';

import { Container, Row } from 'reactstrap';
import { Footer } from './components/footer';
import { ErrorBoundary } from './components/errorboundary';
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
      const decoded = jwtDecode(window.localStorage.getItem('authToken'));
      isAuthenticated = true;
      username = decoded.identity;
    } else {
      isAuthenticated = false;
    }

    this.state = {
      isAuthenticated,
      username,
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
      <Container>
        <Row>
          <ErrorBoundary>
            <main role="main" className="col-md-12 col-lg-12 px-4">
              <Routes isAuthenticated={isAuthenticated} username={username} logoutUser={this.logoutUser} />
            </main>
          </ErrorBoundary>
        </Row>
        <Footer />
      </Container>
    );
  }
}

App.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withCookies(App);
