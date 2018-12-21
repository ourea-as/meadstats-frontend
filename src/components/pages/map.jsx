import React, { useState, useEffect } from 'react';

import 'react-flag-icon-css';
import { Col } from 'reactstrap';

import axios from 'axios';
import { API_ROOT } from '../../api/api-config';

import { HoverMap } from '../charts/hovermap';
import { CountryTable } from '../tables/countrytable';
import { ErrorBoundary } from '../common/errorboundary';

export default function Map(props) {
  const [countries, setCountries] = useState([]);

  useEffect(
    () => {
      if (props.username !== '') {
        axios
          .get(`${API_ROOT}/v1/users/${props.username}/countries`)
          .then(({ data }) => {
            if (data.status === 'success') {
              setCountries(data.data.countries);
            }
          });
      }
    },
    [props.username]
  );

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
