import { csrfFetch } from './csrf';



//---- Action Types----
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";


//--- Action Creators----
export const setUser = (user) => ({
  
    type: SET_USER,
    payload: user
  
});

export const removeUser = () =>({
  type: REMOVE_USER,
  });

//Thunk 

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

  const initialState = {user: null};
  
// Reducer
const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER:
        return { ...state, user: action.payload };
      case REMOVE_USER:
        return { ...state, user: null };
      default:
        return state;
    }
  };

export default sessionReducer;

