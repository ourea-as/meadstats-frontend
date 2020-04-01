import React, { useState, useEffect, ReactElement } from 'react';

import 'react-flag-icon-css';
import { Col } from 'reactstrap';

import axios from 'axios';
import { API_ROOT } from '../api/api-config';

import { CountryStats } from './countrystats';
import { ErrorBoundary } from './errorboundary';
import { BeerTable } from './tables/beertable';
import { Loading } from './loading';
import { Error } from './error';
import { CountryData, User } from '../types';

const CountryHoverMapSuspense = React.lazy(() =>
  import(/* webpackChunkName: "countryhovermap" */ './maps/countryhovermap'),
);

const CountryHoverMap = (props): ReactElement => (
  <React.Suspense fallback={<Loading />}>
    <CountryHoverMapSuspense {...props} />
  </React.Suspense>
);

interface CountryMapProps {
  user?: User;
  country?: string;
}

const CountryMap: React.FC<CountryMapProps> = ({ user, country }): ReactElement => {
  const [data, setData] = useState<CountryData>();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user && country) {
      setError(false);

      axios
        .get(`${API_ROOT}/v1/users/${user.userName}/countries/${country}`)
        .then(({ data }) => {
          if (data.status === 'success') {
            setData(data.data);
          }
        })
        .catch((error) => {
          setError(true);
          console.error(error);
        });
    }
  }, [user, country]);

  if (!data) {
    if (error) {
      return <Error />;
    }
    return <Loading />;
  }
  const beers = data.breweries
    .map((brewery) => {
      return brewery.beers;
    })
    .flat();

  return (
    <>
      <Col xs="12" md="12">
        <ErrorBoundary>
          <CountryStats data={data} />
        </ErrorBoundary>
      </Col>
      <Col xs="12" md="12">
        <ErrorBoundary>
          <CountryHoverMap data={data} />
        </ErrorBoundary>
      </Col>
      <Col xs="12" md="12">
        <BeerTable beers={beers} />
      </Col>
    </>
  );
};

export default CountryMap;
