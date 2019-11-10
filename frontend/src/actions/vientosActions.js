import axios from 'axios';

import {
  READ_APPLICATION_ERRORS,
  VIENTOS_MAP,
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


// Contribution loading
export const setLiveMapVientos = e => {
  
  return {
    type: VIENTOS_MAP,
    payload: e
  };
};

// Get all visible contribution 
export const setVisibleVientos = (viento) => dispatch => {
  dispatch(setLiveVientosVisible(viento));
};

export const setMapVientos = (viento) => dispatch => {
  dispatch(setLiveMapVientos(viento));
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

// Add Comment
export const addComment = (viento, commentData) => dispatch => {
  dispatch(setLiveVientosLoading());
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

// Add Comment
export const addCommentLike = (vientoID, commentID) => dispatch => {
  dispatch(setLiveVientosLoading());
  axios
    .post(`/api/vientos/comment/${vientoID}/${commentID}/like`)
    .then(res =>
      dispatch({
        type: GET_VIENTO,
        payload: res.data
      })
    )
    .catch(err =>
      console.log(err)
      // dispatch({
      //   type: GET_VIENTO,
      //   payload: err.response.data
      // })
    );
};

// Add Reply
export const addReply = (vientoID, commentID, replyData) => dispatch => {
  dispatch(setLiveVientosLoading());
  axios
    .post(`/api/vientos/comment/${vientoID}/${commentID}/reply`, replyData)
    .then(res => {
      dispatch({
        type: READ_APPLICATION_ERRORS,
        payload: ''
      });
      dispatch({
        type: GET_VIENTO,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: READ_APPLICATION_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Reply Like
export const addReplyLike = (vientoID, commentID, replyID) => dispatch => {
  dispatch(setLiveVientosLoading());
  axios
    .post(`/api/vientos/comment/${vientoID}/${commentID}/${replyID}/like`)
    .then(res =>
      dispatch({
        type: GET_VIENTO,
        payload: res.data
      })
    )
    .catch(err =>
      console.log(err)
      // dispatch({
      //   type: GET_VIENTO,
      //   payload: err.response.data
      // })
    );
};

// Delete Comment
export const deleteComment = (vientoId, commentId) => dispatch => {
  dispatch(setLiveVientosLoading());
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

// Delete Reply
export const deleteReply = (vientoID, commentID, replyID) => dispatch => {
  dispatch(setLiveVientosLoading());
  axios
    .delete(`/api/vientos/comment/${vientoID}/${commentID}/${replyID}`)
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