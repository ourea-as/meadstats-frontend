import { UPDATE_COUNTRIES } from './types';

import axios from 'axios';
import { API_ROOT } from '../api/api-config';

export function updateCountries(countries) {
  return {
    type: UPDATE_COUNTRIES,
    countries,
  };
}

export function fetchCountries(username) {
  return dispatch => {
    return axios
      .get(`${API_ROOT}/v1/users/${username}/countries`)
      .then(response => {
        if (response.data.status === 'success') {
          const countries = response.data.data.countries;
          dispatch(updateCountries(countries));
        }
      })
      .catch(error => {
        throw error;
      });
  };
}
