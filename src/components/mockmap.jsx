import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import 'react-flag-icon-css';

import HoverMap from './hovermap';
import { Loading } from './loading';

import { fetchCountries } from '../actions/map';

function MockMap({ countries, dispatch, username }) {
  useEffect(
    () => {
      if (username !== '') {
        dispatch(fetchCountries(username));
      }
    },
    [dispatch, username]
  );

  if (!countries.length) {
    return <Loading />;
  }

  return (
    <>
      <HoverMap countries={countries} interactive={false} region={"World"} />
    </>
  );
}

const mapStateToProps = state => {
  return {
    countries: state.countries
  };
};

export default connect(mapStateToProps)(MockMap);
