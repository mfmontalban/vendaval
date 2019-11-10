import axios from 'axios';

import {
  READ_APPLICATION_ERRORS,
  GET_CONTRIBUTION,
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
        type: GET_CONTRIBUTION,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_CONTRIBUTION,
        payload: {}
      })
    );
};

// Add contribution
export const addContribution = (contribData, history,  data) => dispatch => {
  axios
    .post('/api/staff/files', data)
    .then(res => {
      contribData.bannerOriginal = res.data.response[0].filename;
      contribData.bannerSm = res.data.response[1].filename;
      contribData.bannerLg = res.data.response[2].filename;
      axios
        .post('/api/staff/contribute', contribData)
        .then(res => {
          history.push('/staff/dashboard');
        })
        .catch(err =>
          dispatch({
            type: READ_APPLICATION_ERRORS,
            payload: err.response.data
          })
        );
    });
};

// Delete Old Banner contribution
export const deleteOldBanner = (deleteOldBanner) => dispatch => {
  for (var i = 0; i < deleteOldBanner.length; i++) {
    axios
    .delete(`/api/staff/files/${deleteOldBanner[i]}`)
    .then(res => {
      console.log('yep');
    })
    .catch(err => {
      console.log('nope');
    });
  }
};

// Edit contribution
export const editContribution = (id, contribData, history,  data) => dispatch => {
  axios
    .post('/api/staff/files', data)
    .then(res => {
      if (data) {
        contribData.bannerOriginal = res.data.response[0].filename;
        contribData.bannerSm = res.data.response[1].filename;
        contribData.bannerLg = res.data.response[2].filename;
      }
      axios
        .post(`/api/staff/contribution/${id}`, contribData)
        .then(res => history.push('/staff/dashboard'))
        .catch(err =>
          dispatch({
            type: READ_APPLICATION_ERRORS,
            payload: err.response.data
          })
        );
  });
};

// Add Comment
export const addComment = (viento, commentData) => dispatch => {
  dispatch(setContributionsLoading());
  axios
    .post(`/api/vientos/comment/${viento}`, commentData)
    .then(res =>
      dispatch({
        type: GET_CONTRIBUTION,
        payload: res.data
      })
    )
    .catch(err =>
      console.log('nope')
      // dispatch({
      //   type: GET_VIENTO,
      //   payload: err.response.data
      // })
    );
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
