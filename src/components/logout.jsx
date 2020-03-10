import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router';

class Logout extends Component {
  componentDidMount() {
    const { logoutUser } = this.props;

    logoutUser();
  }

  render() {
    return <Redirect to="/" />;
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func,
};

export default Logout;
