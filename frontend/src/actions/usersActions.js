import axios from 'axios';

import {
  READ_APPLICATION_ERRORS,
  CLEAR_APPLICATION_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  SET_ACCOUNT_AUTH,
  SET_ACCOUNT_AVATAR,
  SET_ACCOUNT_PROFILE
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get profile history
export const getProfileHistory = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/history')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create Profile  
export const createProfile = (profileData, history, data, picnames) => dispatch => {
    if (data) {
      axios 
      .post('/api/users/files', data)
      .then(res => {
        profileData.avatar = picnames.picOriginal;
        profileData.avatarSm = picnames.picSm;
        profileData.avatarLg = picnames.picLg;
        axios
        .delete('/api/users/deleteTemp', { data: profileData })
        .then(res => {
          axios
          .post('/api/profile', profileData)
          .then(res => {
            dispatch({
              type: SET_ACCOUNT_PROFILE,
              payload: res.data
            });
            history.push(`/communidad/${profileData.handle}`);
          })
          .catch(err =>
            dispatch({
              type: READ_APPLICATION_ERRORS,
              payload: err.response.data
            })
          );
        })
      })
    } else {
      axios
        .post('/api/profile', profileData)
        .then(res => {
          dispatch({
            type: SET_ACCOUNT_PROFILE,
            payload: res.data
          });
          history.push(`/communidad/${profileData.handle}`);
        })
        .catch(err =>
          dispatch({
            type: READ_APPLICATION_ERRORS,
            payload: err.response.data
          })
        );
    }
};

// Add Temporary Photo
export const addTempPhoto = (data) => dispatch => {
  axios
    .post('/api/users/files', data)
    .then(res => {
      let tempPhoto = {}
      tempPhoto.pictureSm = res.data.response[0].filename;
      tempPhoto.pictureLg = res.data.response[1].filename;
      axios
        .post('/api/users/uploadTemp', tempPhoto)
        .then(res => {
          dispatch({
            type: SET_ACCOUNT_AVATAR,
            payload: tempPhoto
          });
        })
        .catch(err =>
          console.log('issue uploading temporary photo')
        );
    });
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>{
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        });
        dispatch(clearApplicationErrors());
      }
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
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
          type: SET_ACCOUNT_AUTH,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: READ_APPLICATION_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Profile loading
export const clearApplicationErrors = () => {
  return {
    type: CLEAR_APPLICATION_ERRORS
  };
};
