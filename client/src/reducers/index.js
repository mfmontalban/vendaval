import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import seguridadReducer from './seguridadReducer';
import staffReducer from './staffReducer';
import verifyReducer from './verifyReducer';
import vientosReducer from './vientosReducer';
// import postReducer from './postReducer';

export default combineReducers({
  alerts: alertReducer,
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  seguridad: seguridadReducer,
  staff: staffReducer,
  verify: verifyReducer,
  vientos: vientosReducer,
  // post: postReducer
});
