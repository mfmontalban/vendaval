import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_REGISTERED_ALERT, SET_FORGOT_ALERT, VERIFY, SET_CURRENT_USER, SET_USER_PROFILE } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/registerUser', userData)
    .then(res => {
      // Send email to newly registered user
      axios
        .post('/api/email/sendRegister', userData);
      // Set registered state with Redux
      dispatch({
        type: SET_REGISTERED_ALERT,
        payload: userData.email
      });
      history.push('/login');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Resend Register User key
export const resendRegister = (userData, history) => dispatch => {
// Send email to newly registered user
axios
  .post('/api/email/resendRegister', userData)
  .then(res => {
    dispatch({
      type: SET_REGISTERED_ALERT,
      payload: userData.email
    });
    history.push('/login');
  })
  .catch(err => {
    console.log(err);
    }
  );
};

// Verify Register User key
export const verifyRegister = key => dispatch => {
  axios
    .get(`/api/email/verifyRegister/${key}`)
    .then(res =>
      dispatch({
        type: VERIFY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: VERIFY,
        payload: err.data
      })
    );
};

// Verify Register User key
export const verifyUpdate = key => dispatch => {
  axios
    .get(`/api/email/verifyUpdate/${key}`)
    .then(res =>
      dispatch({
        type: VERIFY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: VERIFY,
        payload: err.data
      })
    );
};



// Login - Get User Token
export const loginUser = userData => dispatch => {

  axios
    .post('/api/users/loginUser', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      // Set user's profile
      dispatch(setUserProfile(decoded.id));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Profile loading
export const setUserProfile = id => dispatch => {
  axios
    .get(`/api/profile/user/${id}`)
    .then(res =>
      dispatch({
        type: SET_USER_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: SET_USER_PROFILE,
        payload: null
      })
    );
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};



// Forgot Password
export const sendForgot = (userData, history) => dispatch => {

  axios
    .post('/api/email/sendForgot', userData)
    .then(res => {
      dispatch({
        type: SET_FORGOT_ALERT,
        payload: userData.email
      });
      history.push('/login');
    })
    .catch(err => {
      console.log(err);
      }
    );
};

// Resend Forgot Password email
export const resendForgot = (userData, history) => dispatch => {
// Send email to newly registered user
axios
  .post('/api/email/resendForgot', userData)
  .then(res => {
    dispatch({
      type: SET_FORGOT_ALERT,
      payload: userData.email
    });
    history.push('/login');
  })
  .catch(err => {
    console.log(err);
    }
  );
};

// Verify Forgot Password key
export const verifyForgot = key => dispatch => {
  axios
    .get(`/api/email/verifyForgot/${key}`)
    .then(res =>
      dispatch({
        type: VERIFY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: VERIFY,
        payload: err.data
      })
    );
};

// Reset Password
export const resetPassword = (key, userData, history) => dispatch => {
// Send email to newly registered user
axios
  .post(`/api/users/resetPassword/${key}`, (userData))
  .then(res => {
    history.push('/login');
  })
  .catch(err =>{
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });}
  );
};
