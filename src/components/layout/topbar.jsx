import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Navbar, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBeer } from '@fortawesome/free-solid-svg-icons';

import './topbar.css';

class Topbar extends React.Component {
  constructor(props) {
    super(props);

    this.loadUser = this.loadUser.bind(this);

    this.state = {
      searchname: ''
    };
  }

  loadUser() {
    const { history } = this.props;
    const { searchname } = this.state;

    history.push(`/user/${searchname}`);
  }

  updateSearchName(evt) {
    this.setState({
      searchname: evt.target.value
    });
  }

  render() {
    const { searchname } = this.state;
    const { isAuthenticated, username } = this.props;

    return (
      <Navbar
        dark
        className="navbar-fixed-top bg-dark flex-md-nowrap p-0 shadow"
      >
        <NavbarBrand className="col-sm-3 col-md-2 mr-0" href="/">
          <FontAwesomeIcon icon={faBeer} className="navbar-icon" />
          Meadstats
        </NavbarBrand>

        <form className="navbar-form form-inline">
          <div className="form-group">
            <input
              className="user-search"
              type="text"
              placeholder="Search"
              aria-label="Username"
              value={searchname}
              onChange={evt => this.updateSearchName(evt)}
            />
          </div>
          <button
            className="btn btn-outline-light my-2 my-sm-0 user-search-button"
            type="submit"
            onClick={this.loadUser}
          >
            Load
          </button>
        </form>

        <ul className="navbar-nav px-3">
          <NavItem className="signin-text">
            {isAuthenticated ? (
              <Fragment>
                Signed in as {username}
                <NavLink
                  tag={RouterNavLink}
                  to="/signout"
                  className="signin-button"
                >
                  Sign Out
                </NavLink>
              </Fragment>
            ) : (
              <NavLink href="https://untappd.com/oauth/authenticate/?client_id=AD153FB3121F3B72DF627FE5AB27140E32C12BDA&response_type=code&redirect_url=https://api.meadstats.com/auth_callback">
                Sign In
              </NavLink>
            )}
          </NavItem>
        </ul>
      </Navbar>
    );
  }
}

Topbar.propTypes = {
  history: PropTypes.object,
  username: PropTypes.string,
  isAuthenticated: PropTypes.bool
};

export default withRouter(Topbar);
