import {
  GET_VIENTOS,
  GET_VIENTO,
  VIENTOS_MAP,
  VIENTOS_LOADING,
  VIENTOS_VISIBLE,
} from '../actions/types';

const initialState = {
  map: null,
  viento: null,
  vientos: null,
  visible: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VIENTO:
      return {
        ...state,
        viento: action.payload,
        loading: false
      };
    case GET_VIENTOS:
      return {
        ...state,
        vientos: action.payload,
        loading: false
      };
    case VIENTOS_MAP:
      return {
        ...state,
        map: action.payload,
      };
    case VIENTOS_LOADING:
      return {
        ...state,
        loading: true
      };
    case VIENTOS_VISIBLE:
      return {
        ...state,
        visible: action.payload,
      };
    default:
      return state;
  }
}
