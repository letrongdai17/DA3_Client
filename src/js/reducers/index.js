import { combineReducers } from 'redux';
import dummy from './dummy';

const appReducer = combineReducers({
  dummy,
});

const rootReducer = (state, action) => {
  if (action.type === 'AUTH_LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
