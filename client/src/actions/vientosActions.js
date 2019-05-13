import axios from 'axios';

import {
  VIENTOS_LOADING,
  VIENTOS_VISIBLE,
  GET_VIENTOS,
  GET_VIENTO,
} from './types';

// Contribution loading
export const setLiveVientosLoading = () => {
  return {
    type: VIENTOS_LOADING
  };
};

// Contribution loading
export const setLiveVientosVisible = e => {
  
  return {
    type: VIENTOS_VISIBLE,
    payload: e
  };
};

// Get all contribution 
export const getLiveVientos = () => dispatch => {
  dispatch(setLiveVientosLoading());
  axios
    .get('/api/vientos/getAll')
    .then(res =>
      dispatch({
        type: GET_VIENTOS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_VIENTOS,
        payload: null
      })
    );
};

// Get all visible contribution 
export const setVisibleVientos = (viento) => dispatch => {
  dispatch(setLiveVientosVisible(viento));
};

export const sendVoteUp = y => dispatch => {
  axios
    .post('/api/vientos/sendVoteUp', y)
    .then(res => {
      dispatch(getLiveVientos());
      // Set registered state with Redux
    })
    .catch(err =>{
      console.log(err);
    });
}

export const sendVoteDown = y => dispatch => {
  axios
    .post('/api/vientos/sendVoteDown', y)
    .then(res => {
      dispatch(getLiveVientos());
      // Set registered state with Redux
    })
    .catch(err =>{
      console.log(err);
    });
}

// Get current contribution
export const getLiveVientoByID = id => dispatch => {
  dispatch(setLiveVientosLoading());
  axios
    .get(`/api/vientos/get/${id}`)
    .then(res =>
      dispatch({
        type: GET_VIENTO,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_VIENTO,
        payload: null
      })
    );
};

// Add Comment
export const addComment = (viento, commentData) => dispatch => {
  axios
    .post(`/api/vientos/comment/${viento}`, commentData)
    .then(res =>
      dispatch({
        type: GET_VIENTO,
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

// Delete Comment
export const deleteComment = (vientoId, commentId) => dispatch => {
  axios
    .delete(`/api/vientos/comment/${vientoId}/${commentId}`)
    .then(res =>{
      dispatch({
        type: GET_VIENTO,
        payload: res.data
      })}
    )
    .catch(err =>
      console.log('here2')
      // dispatch({
      //   type: GET_VIENTO,
      //   payload: err.response.data
      // })}
    );
};