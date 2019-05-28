import axios from 'axios';

import { READ_APPLICATION_TITLES, READ_APPLICATION_ERRORS, SET_LANGUAGE, SET_SORTS_RECENTNEWEST, SET_SORTS_RECENTOLDEST, SET_FILTERS_TEXT, SET_CENTERED_MAP, SEND_APPLICATION_ALERTS_REGISTERED, SEND_APPLICATION_ALERTS_FORGOT, SEND_APPLICATION_ALERTS_UPDATED, SET_ACCOUNT_USER, VERIFY_APPLICATION_ALERTS } from './types';
import { STATES } from 'mongoose';

// Retrieve title results
export const readApplicationTitles = () => dispatch => {
  axios
    .get('/api/application/readApplicationTitles')
    .then(res => {
      dispatch({
        type: READ_APPLICATION_TITLES,
        payload: res.data
      });
    })
    .catch(err =>{
      dispatch({
        type: READ_APPLICATION_TITLES,
        payload: {}
      });
    });
};

export const setLocale = language => {
  localStorage.language = language;
  return {
    type: SET_LANGUAGE,
    payload: language 
  };
};

export const setSortsRecentNewest = e => {
  return {
    type: SET_SORTS_RECENTNEWEST,
    payload:  'publisheddown',
  };
};

export const setSortsRecentOldest = e => {
  return {
    type: SET_SORTS_RECENTOLDEST,
    payload:  'publishedup',
  };
};

export const setSort = (title, direction) => {
  return {
    // type: SET_SORTS_RECENTOLDEST,
    // payload:  'publishedup',
  };
};

export const setFiltersText = e => {
  return {
    type: SET_FILTERS_TEXT,
    payload:  e,
  };
};

export const setCenteredMap = e => {
  return {
    type: SET_CENTERED_MAP,
    payload:  e,
  };
};

// Register account & send email
export const sendApplicationAlertsRegistered = (userData, history) => dispatch => {
  axios
    .post('/api/application/sendApplicationAlertsRegistered', userData)
    .then(res => {
      // Send email to newly registered user
      axios
        .post('/api/email/sendApplicationAlertsRegistered', userData);
      // Set registered state with Redux
      dispatch({
        type: SEND_APPLICATION_ALERTS_REGISTERED,
        payload: userData.email
      });
      if (userData.language === 'es') {
        history.push('/iniciar');
      } else {
        history.push('/login');
      }
      
    })
    .catch(err =>{
      dispatch({
        type: READ_APPLICATION_ERRORS,
        payload: err.response.data
      })}
    );
};

// Verify registered account key
export const verifyApplicationAlertsRegistered = key => dispatch => {
  axios
    .get(`/api/application/verifyApplicationAlertsRegistered/${key}`)
    .then(res =>
      dispatch({
        type: VERIFY_APPLICATION_ALERTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: VERIFY_APPLICATION_ALERTS,
        payload: err.data
      })
    );
};

// Resend registered account email
export const resendApplicationAlertsRegistered = (userData, history) => dispatch => {
// Send email to newly registered user
axios
  .post('/api/email/resendApplicationAlertsRegistered', userData)
  .then(res => {
    dispatch({
      type: SEND_APPLICATION_ALERTS_REGISTERED,
      payload: userData.email
    });
    history.push('/login');
  })
  .catch(err => {
    console.log(err);
    }
  );
};



// Send forgot password email
export const sendApplicationAlertsForgot = (userData, history) => dispatch => {

  axios
    .post('/api/email/sendApplicationAlertsForgot', userData)
    .then(res => {
      dispatch({
        type: SEND_APPLICATION_ALERTS_FORGOT,
        payload: userData.email
      });
      history.push('/login');
    })
    .catch(err => {
      console.log(err);
      }
    );
};

// Resend forgot password email
export const resendApplicationAlertsForgot = (userData, history) => dispatch => {
// Send email to newly registered user
axios
  .post('/api/email/resendApplicationAlertsForgot', userData)
  .then(res => {
    dispatch({
      type: SEND_APPLICATION_ALERTS_FORGOT,
      payload: userData.email
    });
    history.push('/login');
  })
  .catch(err => {
    console.log(err);
    }
  );
};

// Verify forgot password key
export const verifyApplicationAlertsForgot = key => dispatch => {
  axios
    .get(`/api/application/verifyApplicationAlertsForgot/${key}`)
    .then(res =>
      dispatch({
        type: VERIFY_APPLICATION_ALERTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: VERIFY_APPLICATION_ALERTS,
        payload: err.data
      })
    );
};

// Reset password
export const resetAccountPassword = (key, userData, history) => dispatch => {
// Send email to newly registered user
axios
  .post(`/api/application/resetAccountPassword/${key}`, (userData))
  .then(res => {
    history.push('/login');
  })
  .catch(err =>{
    dispatch({
      type: READ_APPLICATION_ERRORS,
      payload: err.response.data
    });}
  );
};



// Send updated account email
export const sendApplicationAlertsUpdated = (accountData, history) => dispatch => {
  axios
    .get('/api/account/readAccountInfo')
    .then(res => {
      accountData.originalName = res.data.name;
      accountData.originalEmail = res.data.email;
      if (res.data.name !== accountData.name) {
        accountData["nChange"] = true;
      }
      if (res.data.email !== accountData.email) {
        accountData["eChange"] = true;
      }
      if (accountData.password !== "") {
        accountData["pChange"] = true;
      }
      dispatch({
        type: SEND_APPLICATION_ALERTS_UPDATED,
        payload: res.data.email
      });
      // Set registered state with Redux
      axios
        .post('/api/application/sendApplicationAlertsUpdated', accountData)
        .then(res => {
          // Send email regarding account changes
          axios
          .post('/api/email/sendApplicationAlertsUpdated', (res, accountData));
          // Set user information
          axios
            .get(`/api/account/info/${res.data._id}`)
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
          history.push('/vientos')
        })
        .catch(err =>
          dispatch({
            type: READ_APPLICATION_ERRORS,
            payload: err.response.data
          })
        );
    });
};

// Verify update account key
export const verifyApplicationAlertsUpdated = key => dispatch => {
  axios
    .get(`/api/application/verifyApplicationAlertsUpdated/${key}`)
    .then(res =>
      dispatch({
        type: VERIFY_APPLICATION_ALERTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: VERIFY_APPLICATION_ALERTS,
        payload: err.data
      })
    );
};

export const closeApplicationAlertsUpdated = () => dispatch => {
  dispatch(closeApplicationAlerts());
};

// Contribution loading
export const closeApplicationAlerts = () => {
  return {
    type: SEND_APPLICATION_ALERTS_UPDATED,
    payload: null
  };
};