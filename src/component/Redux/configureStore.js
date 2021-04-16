import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './../reducer';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.MODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    showldHotReload: false,
  }) : compose;

const configureStore = () => {
  const middlewares = [thunk];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(rootReducer, composeEnhancers(...enhancers));
  return store;
};

export default configureStore;
