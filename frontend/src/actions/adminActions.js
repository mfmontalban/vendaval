import axios from 'axios';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { READ_APPLICATION_ERRORS, SET_ACCOUNT_LOADING, SET_ACCOUNT_AUTH, SET_ACCOUNT_USER, SET_ACCOUNT_PROFILE, CLEAR_APPLICATION_ALERTS, CLEAR_APPLICATION_ERRORS  } from './types';

////////// LOGIN ACTIONS //////////

// Login account
export const loginAccount = (userData, history) => dispatch => {

  axios
    .post('/api/account/loginAccount', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set account auth
      dispatch(setAccountID(decoded.id));
      // Set account account
      dispatch(setAccountInfo(decoded.id));
      // Set account profile
      dispatch(setAccountHandle(decoded.id));
      // Clear Registered/ Forgot alerts
      dispatch(clearApplicationAlerts());
      // Clear Registered/ Forgot alerts
      dispatch(clearApplicationErrors());
      if (userData.language === 'es') {
        history.push('/vientos');
      } else {
        history.push('/winds');
      }
    })
    .catch(err =>
      dispatch({
        type: READ_APPLICATION_ERRORS,
        payload: err.response
      })
    );
};

// Set authentication information
export const setAccountID = decoded => {
  return {
    type: SET_ACCOUNT_AUTH,
    payload: decoded
  };
};

// Set user information
export const setAccountInfo = id => dispatch => {
  axios 
    .get(`/api/account/info/${id}`)
    .then(res =>
      dispatch({
        type: SET_ACCOUNT_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: SET_ACCOUNT_USER,
        payload: {}
      })
    );
};

// Set profile information 
export const setAccountHandle = id => dispatch => {
  axios
    .get(`/api/account/profile/${id}`)
    .then(res =>{
      dispatch({
        type: SET_ACCOUNT_PROFILE,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: SET_ACCOUNT_PROFILE,
        payload: {avatarSm: null, avatarLg: null, handle: null}
      })
    );
};

// Clear application alerts
export const clearApplicationAlerts = () => dispatch => {
  return {
    type: CLEAR_APPLICATION_ALERTS,
    payload: null
  };
}

// Clear application alerts
export const clearApplicationErrors = () => dispatch => {
  return {
    type: CLEAR_APPLICATION_ERRORS,
    payload: null
  };
}

// Logout account
export const logoutAccount = (history) => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setAccountID({}));
  dispatch(setAccountInfo({}));
  dispatch(setAccountHandle({}));
  dispatch(clearApplicationAlerts());
  dispatch(clearApplicationErrors());
  history.push('/login');
};

////////// END LOGIN ACTIONS //////////



////////// SECURITY ACTIONS //////////

// Set account loading
export const setAccountLoading = () => {
  return {
    type: SET_ACCOUNT_LOADING
  };
};

// Read account info
export const readAccountInfo = () => dispatch => {
  dispatch(setAccountLoading());
  axios
    .get('/api/account/readAccountInfo')
    .then(res =>
      dispatch({
        type: SET_ACCOUNT_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: SET_ACCOUNT_USER,
        payload: {}
      })
    );
};

////////// END SECURITY ACTIONS //////////
