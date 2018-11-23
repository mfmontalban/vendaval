import axios from 'axios';

import {
  GET_ERRORS,
  GET_CONTRIBUTIONS,
  CONTRIBUTIONS_LOADING
} from './types';

// Get current contribution
export const getContributions = () => dispatch => {
  dispatch(setContributionsLoading());
  axios
    .get('/api/staff/dashboard')
    .then(res =>
      dispatch({
        type: GET_CONTRIBUTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CONTRIBUTIONS,
        payload: {}
      })
    );
};

// Get current contribution
export const getContributionByID = id => dispatch => {
  dispatch(setContributionsLoading());
  axios
    .get(`/api/staff/contribution/${id}`)
    .then(res => {
      dispatch({
        type: GET_CONTRIBUTIONS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_CONTRIBUTIONS,
        payload: {}
      })
    );
};

// Add contribution
export const addContribution = (contribData, data, history) => dispatch => {
  axios
    .post('/api/staff/files', data)
    .then(res => {
      contribData.banner = res.data.file;
      axios
        .post('/api/staff/contribute', contribData)
        .then(res => {
          history.push('/staff/dashboard');
        })
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    });
};

// Edit contribution
export const editContribution = (id, contribData, data, history) => dispatch => {
  axios
    .post('/api/staff/files', data)
    .then(res => {
      contribData.banner = res.data.file;
      axios
        .post(`/api/staff/contribution/${id}`, contribData)
        .then(res => history.push('/staff/dashboard'))
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
  });
};

// Delete contribution
export const deleteContribution = (id, history) => dispatch => {
  dispatch(setContributionsLoading());
  axios
    .delete(`/api/staff/contribution/${id}`)
    .then(res =>{
      history.push('/staff/dashboard');
      dispatch({
        type: GET_CONTRIBUTIONS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_CONTRIBUTIONS,
        payload: {}
      })
    );
};

// Contribution loading
export const setContributionsLoading = () => {
  return {
    type: CONTRIBUTIONS_LOADING
  };
};
