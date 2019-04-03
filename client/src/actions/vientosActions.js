import axios from 'axios';

import {
  VIENTOS_LOADING,
  GET_VIENTOS,
  GET_VIENTO,
} from './types';

// Contribution loading
export const setLiveVientosLoading = () => {
  return {
    type: VIENTOS_LOADING
  };
};

// Get current contribution 
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