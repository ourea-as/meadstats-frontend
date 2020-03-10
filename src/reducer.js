import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import countries from './reducers/mapReducer';

export default history =>
  combineReducers({
    countries: countries,
    router: connectRouter(history),
  });
