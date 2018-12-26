import React, { useState, useEffect } from 'react';

import 'react-flag-icon-css';
import { Col } from 'reactstrap';

import axios from 'axios';
import { API_ROOT } from '../api/api-config';

import CountryHoverMap from './countryhovermap';
import CountryStats from './countrystats';
import { ErrorBoundary } from './errorboundary';
import { BeerTable } from './beertable';

export default function CountryMap(props) {
  const [data, setData] = useState();

  useEffect(
    () => {
      if (props.username !== '') {
        axios
          .get(
            `${API_ROOT}/v1/users/${props.username}/countries/${props.country}`
          )
          .then(({ data }) => {
            if (data.status === 'success') {
              setData(data.data);
            }
          });
      }
    },
    [props.username]
  );

  if (data) {
    const beers = data.breweries
      .map(function(brewery) {
        return brewery.beers;
      })
      .flat();

    return (
      <>
        <Col xs="12" md="6">
          <ErrorBoundary>
            <CountryStats data={data} />
          </ErrorBoundary>
        </Col>
        <Col xs="12" md="6">
          <ErrorBoundary>
            <CountryHoverMap data={data} />
          </ErrorBoundary>
        </Col>
        <Col xs="12" md="12">
          <BeerTable beers={beers} />
        </Col>
      </>
    );
  } else {
    return 'Loading...';
  }
}
