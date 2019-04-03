import {
  READ_APPLICATION_ERRORS,
  READ_APPLICATION_TITLES,

  CLEAR_APPLICATION_ALERTS,
  CLEAR_APPLICATION_ERRORS,

  SET_LANGUAGE,

  SET_SORTS_RECENTNEWEST,
  SET_SORTS_RECENTOLDEST,

  SET_FILTERS_RECENTOLDEST,

  SEND_APPLICATION_ALERTS_REGISTERED,
  SEND_APPLICATION_ALERTS_FORGOT,
  SEND_APPLICATION_ALERTS_UPDATED,

  VERIFY_APPLICATION_ALERTS
} from '../actions/types';

const initialState = {
  alerts: {
    forgot: null,
    registered: null,
    updated: null,
  },
  errors: {},
  filters: {
    text: {
      author: '',
      content: '',
      keyword: '',
    },
    sortBy: {},
    startYear: undefined,
    endYear: undefined
  },
  language: 'en',
  messages: {},
  settings: {},
  titles: {},
  verify: {
    success: null,
    expired: null
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_APPLICATION_TITLES:
      return {
        ...state,
        titles: action.payload
      };
    case READ_APPLICATION_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_APPLICATION_ALERTS:
      return {
        ...state,
        alerts: {
          forgot: null,
          registered: null,
          updated: null,
        }
      };
    case CLEAR_APPLICATION_ERRORS:
      return {
        ...state,
        errors: {},
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    case SET_SORTS_RECENTNEWEST:
      return {
        ...state,
        filters: {
          text: {},
          sortBy: action.payload,
        }
      };
    case SET_SORTS_RECENTOLDEST:
      return {
        ...state,
        filters: {
          text: {},
          sortBy: action.payload,
        }
      };
    case SEND_APPLICATION_ALERTS_REGISTERED:
      return {
        ...state,
        alerts: {
          forgot: null,
          registered: action.payload,
          updated: null,
        }
      };
    case SEND_APPLICATION_ALERTS_FORGOT:
      return {
        ...state,
        alerts: {
          forgot: action.payload,
          registered: null,
          updated: null,
        }
      };
    case SEND_APPLICATION_ALERTS_UPDATED:
      return {
        ...state,
        alerts: {
          forgot: null,
          registered: null,
          updated: action.payload,
        }
      };
    case VERIFY_APPLICATION_ALERTS:
      return {
        ...state,
        verify: action.payload
      };
    default:
      return state;
  }
}
