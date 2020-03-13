import React, { useEffect, useState } from 'react';
import axios from 'axios';

import 'react-flag-icon-css';

import { HoverMap } from './hovermap';
import { Loading } from '../loading';

import { API_ROOT } from '../../api/api-config';

type MockMapProps = {
  username: string;
};

const MockMap: React.FC<MockMapProps> = ({ username }) => {
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
        .catch(error => {
          throw error;
        });
    }
  }, [username]);

  if (!countries.length) {
    return <Loading />;
  }

  return (
    <>
      <HoverMap countries={countries} interactive={false} region={'World'} />
    </>
  );
};

export default MockMap;
