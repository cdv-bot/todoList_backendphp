import { combineReducers } from 'redux';
import list from './list';
import loadings from './loading';
import page from './page';
const rootReducer = combineReducers({
  list,
  loadings,
  page
});

export default rootReducer;
