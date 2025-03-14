import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import {thunk} from 'redux-thunk'
import userReducer from './session'
import spotsReducer from './spotsStore'

let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const rootReducer =combineReducers({
    session: userReducer,
    spots: spotsReducer
})

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };
  
  export default configureStore;
  