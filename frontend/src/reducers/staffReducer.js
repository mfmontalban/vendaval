import {
  GET_CONTRIBUTION,
  GET_CONTRIBUTIONS,
  CONTRIBUTIONS_LOADING,
  READ_STAFF_REVIEWERS,
} from '../actions/types';

const initialState = {
  contribution: null,
  contributions: null,
  reviewers: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONTRIBUTIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CONTRIBUTION:
      return {
        ...state,
        contribution: action.payload,
        loading: false
      };
    case GET_CONTRIBUTIONS:
      return {
        ...state,
        contributions: action.payload,
        loading: false
      };
    case READ_STAFF_REVIEWERS:
      return {
        ...state,
        reviewers: action.payload,
      };
    default:
      return state;
  }
}
