import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import 'react-flag-icon-css';
import { Col } from 'reactstrap';

import HoverMap from './hovermap';
import CountryTable from './countrytable';
import { ErrorBoundary } from './errorboundary';
import { Loading } from './loading';

import { fetchCountries } from '../actions/map';

function Map({ countries, dispatch, username }) {
  useEffect(
    () => {
      if (username !== '') {
        dispatch(fetchCountries(username));
      }
    },
    [username]
  );

  if (!countries.length) {
    return <Loading />;
  }

  return (
    <>
      <Col xs="12">
        <ErrorBoundary>
          <HoverMap countries={countries} />
        </ErrorBoundary>
      </Col>
      <Col xs="12">
        <ErrorBoundary>
          <CountryTable countries={countries} />
        </ErrorBoundary>
      </Col>
    </>
  );
}

const mapStateToProps = state => {
  return {
    countries: state.countries
  };
};

export default connect(mapStateToProps)(Map);
