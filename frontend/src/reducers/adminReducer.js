import isEmpty from './validation/is-empty';

import {
  SET_ACCOUNT_LOADING,
  SET_ACCOUNT_AUTH,
  SET_ACCOUNT_AVATAR,
  SET_ACCOUNT_USER,
  SET_ACCOUNT_PROFILE
} from '../actions/types';
 
const initialState = {
  isAuthenticated: '',
  id: null,
  avatarSm: null,
  avatarLg: null,
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
        id: action.payload
      };
    case SET_ACCOUNT_AVATAR:
      return {
        ...state,
        avatarSm: action.payload.pictureSm,
        avatarLg: action.payload.pictureLg,
      };
    case SET_ACCOUNT_USER:
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
        staff: action.payload.staff,
        loading: false
      };
    case SET_ACCOUNT_PROFILE:
      return {
        ...state,
        avatarSm: action.payload.avatarSm,
        avatarLg: action.payload.avatarLg,
        handle: action.payload.handle,
      };
    default:
      return state;
  }
}
