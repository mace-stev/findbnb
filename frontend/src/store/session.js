import { csrfFetch } from './csrf';

export const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser"
const initialState = { user: null };
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({
        credential,
        password
      })
    });
    const data = await response.json();
    dispatch(receiveUser(data.user));
    return response;
  };



export const restoreUser = () => async (dispatch) => {
  const res = await csrfFetch("/api/session");
  const data = await res.json();
  res.data = data;
  if (res.ok) { 
    
    dispatch(receiveUser(data?.user));
  } else {
   
    throw res;
  }
};

const receiveUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
const removeUser = () => {
    return {
      type: REMOVE_USER
    };
  };

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password
      })
    });
    const data = await response.json();
    dispatch(receiveUser(data.user));
    return response;
  };
  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE'
    });
    dispatch(removeUser());
    return response;
  };


export default function userReducer( state=initialState, action){
  const newState={};
  let allIdsArray=[...state?.allIds|| []]
  let byIds={...state?.byId|| {}}
     switch(action.type){
      case SET_USER:
        allIdsArray=[]
        byIds={}
        allIdsArray.push(action?.payload?.id)
        byIds[action?.payload?.id]=action?.payload
      newState['byId']=byIds
      newState['allIds']=allIdsArray
      return newState;
      case REMOVE_USER:
        return { ...state, user: null };
     
     default:
      return state
   }}