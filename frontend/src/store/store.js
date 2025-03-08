import {createStore, combineReducers, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import userReducer from './userStore'
import spotsReducer from './spotsStore'


const rootReducer =combineReducers({
    user: userReducer,
    spots: spotsReducer
})

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));
  };
  
  export default configureStore;
  