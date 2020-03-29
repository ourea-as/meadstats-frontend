import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';

import 'react-flag-icon-css';
import { Nav, NavItem, Col } from 'reactstrap';

import CountryTable from './tables/countrytable';
import { ErrorBoundary } from './errorboundary';
import { Loading } from './loading';

import { API_ROOT } from '../api/api-config';

const regions = ['World', 'Africa', 'Asia', 'Europe', 'Oceania', 'North America', 'South America'];

type MapProps = {
  username: string;
};

const HoverMapSuspense = React.lazy(() => import(/* webpackChunkName: "hovermap" */ './maps/hovermap'));

const HoverMap = (props): ReactElement => (
  <React.Suspense fallback={<Loading />}>
    <HoverMapSuspense {...props} />
  </React.Suspense>
);

const Map: React.FC<MapProps> = ({ username }) => {
  const [region, setRegion] = useState('World');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (username !== '') {
      axios
        .get(`${API_ROOT}/v1/users/${username}/countries`)
        .then(({ data }) => {
          if (data.status === 'success') {
            const countries = data.data.countries;
            setCountries(countries);
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  }, [username]);

  if (!countries.length) {
    return <Loading />;
  }

  return (
    <>
      <Col xs="12">
        <Nav pills horizontal="center" className="user-tabs">
          {regions.map((value, index) => {
            return (
              <NavItem
                className={value === region ? 'active user-nav-tab' : ''}
                key={index}
                onClick={(): void => setRegion(value)}
              >
                <span className="nav-link user-nav-link  user-nav-tab">{value}</span>
              </NavItem>
            );
          })}
        </Nav>
      </Col>
      <Col xs="12">
        <ErrorBoundary>
          <HoverMap countries={countries} interactive={true} region={region} />
        </ErrorBoundary>
      </Col>
      <Col xs="12">
        <ErrorBoundary>
          <CountryTable countries={countries} />
        </ErrorBoundary>
      </Col>
    </>
  );
};

export default Map;
