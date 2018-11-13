import axios from 'axios';

import {
  GET_ERRORS,
  GET_SEGURIDAD,
  SET_CURRENT_USER,
  CLEAR_CURRENT_PROFILE,
} from './types';

// Get current profile
export const getCurrentSeguridad = () => dispatch => {
  axios
    .get('/api/seguridad')
    .then(res =>
      dispatch({
        type: GET_SEGURIDAD,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SEGURIDAD,
        payload: {}
      })
    );
};

// Edit Account Information
export const editAccount = (accountData, history) => dispatch => {
  axios
    .post('/api/seguridad/edit', accountData)
    .then(res => history.push('/vientos'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
