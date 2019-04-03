import isEmpty from '../validation/is-empty';

import {
  SET_ACCOUNT_LOADING,
  SET_ACCOUNT_AUTH,
  SET_ACCOUNT_USER,
  SET_ACCOUNT_PROFILE
} from '../actions/types';
 
const initialState = {
  isAuthenticated: false,
  id: null,
  avatar: null,
  email: null,
  handle: null,
  name: null,
  staff: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ACCOUNT_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_ACCOUNT_AUTH:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        id: action.payload.id
      };
    case SET_ACCOUNT_USER:
      return {
        ...state,
        avatar: action.payload.avatar,
        email: action.payload.email,
        name: action.payload.name,
        staff: action.payload.staff,
        loading: false
      };
    case SET_ACCOUNT_PROFILE:
      return {
        ...state,
        handle: action.payload.handle
      };
    default:
      return state;
  }
}
