import {
  GET_SEGURIDAD,
  CLEAR_CURRENT_PROFILE
} from '../actions/types';

const initialState = {
  account: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SEGURIDAD:
      return {
        ...state,
        account: action.payload
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        account: null
      };
    default:
      return state;
  }
}
