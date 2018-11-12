import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import staffReducer from './staffReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import verifyReducer from './verifyReducer';
// import postReducer from './postReducer';

export default combineReducers({
  alerts: alertReducer,
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  staff: staffReducer,
  verify: verifyReducer,
  // post: postReducer
});
