import { UPDATE_COUNTRIES } from '../actions/types';

export default function mapReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_COUNTRIES:
      console.log(action);
      return action.countries;
    default:
      return state;
  }
}
