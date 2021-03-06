import axios from 'axios';

import {
  READ_APPLICATION_ERRORS,
  READ_STAFF_REVIEWERS,
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
export const getAllContributions = () => dispatch => {
  dispatch(setContributionsLoading());
  axios
    .get('/api/staff/dashboardAll')
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
export const getContributionByID = (id, admin) => dispatch => {
  dispatch(setContributionsLoading());
  axios
    .get(`/api/staff/contribution/${id}`, admin)
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
  if (data) {
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
  } else {
      axios
        .post(`/api/staff/contribution/${id}`, contribData)
        .then(res => history.push('/staff/dashboard'))
        .catch(err =>
          dispatch({
            type: READ_APPLICATION_ERRORS,
            payload: err.response.data
          })
        );
  }
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

// Update contribution status
export const updateStatus = (id, status, history) => dispatch => {
  dispatch(setContributionsLoading());
  axios
    .post(`/api/staff/contributionStatus/${id}`, status)
    .then(res =>{
      if (status.staff === "staff") {
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
      } else if ((status.staff === "reviewer") || (status.staff === "manager") || (status.staff === "webmaster")) {
        axios
        .get('/api/staff/dashboardAll')
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
      }
    })
    .catch(err =>
      dispatch({
        type: GET_CONTRIBUTIONS,
        payload: {}
      })
    );
};

// Update contribution status
export const updateReviewer = (id, status, history) => dispatch => {
  dispatch(setContributionsLoading());
  axios
    .post(`/api/staff/contributionReviewer/${id}`, status)
    .then(res =>{
      if (status.staff === "staff") {
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
      } else if ((status.staff === "reviewer") || (status.staff === "manager") || (status.staff === "webmaster")) {
        axios
        .get('/api/staff/dashboardAll')
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
      }
    })
    .catch(err =>
      dispatch({
        type: GET_CONTRIBUTIONS,
        payload: {}
      })
    );
};

// Retrieve title results
export const readStaffReviewers = () => dispatch => {
  axios
    .get('/api/staff/readStaffReviewers')
    .then(res => {
      dispatch({
        type: READ_STAFF_REVIEWERS,
        payload: res.data
      });
    })
    .catch(err =>{
      dispatch({
        type: READ_STAFF_REVIEWERS,
        payload: []
      });
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
