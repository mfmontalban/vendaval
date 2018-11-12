import { SET_REGISTERED_ALERT, SET_FORGOT_ALERT } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_REGISTERED_ALERT:
      return {
        ...state,
        registered: action.payload
      };
    case SET_FORGOT_ALERT:
      return {
        ...state,
        forgot: action.payload
      };
    default:
      return state;
  }
}
