import {
  GET_CONTRIBUTIONS,
  CONTRIBUTIONS_LOADING,
} from '../actions/types';

const initialState = {
  contribution: null,
  contributions: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONTRIBUTIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CONTRIBUTIONS:
      return {
        ...state,
        contributions: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
