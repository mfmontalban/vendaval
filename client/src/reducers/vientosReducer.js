import {
  GET_VIENTOS,
  GET_VIENTO,
  VIENTOS_LOADING
} from '../actions/types';

const initialState = {
  vientos: null,
  viento: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VIENTOS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_VIENTOS:
      return {
        ...state,
        vientos: action.payload,
        loading: false
      };
      case GET_VIENTO:
        return {
          ...state,
          viento: action.payload,
          loading: false
        };
    default:
      return state;
  }
}
