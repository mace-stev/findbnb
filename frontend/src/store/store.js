import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';


  const placeholderReducer = (state = {}, action) => {
    switch (action.type) {
        case 'hello':
            return { ...state, message: 'Hello from Redux!' };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    placeholder: placeholderReducer, // Add more reducers as needed
}) // ADD REDUCERS HERE
 

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
