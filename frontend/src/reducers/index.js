import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import applicationReducer from './applicationReducer';
import usersReducer from './usersReducer';
import staffReducer from './staffReducer';
import vientosReducer from './vientosReducer';

export default combineReducers({
  admin: adminReducer,
  application: applicationReducer,
  staff: staffReducer,
  users: usersReducer,
  vientos: vientosReducer,
});
