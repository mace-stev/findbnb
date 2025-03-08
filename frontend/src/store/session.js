import { csrfFetch } from './csrf';

export const RECEIVE_USER = 'RECEIVE_USER';
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
  const res = await csrfFetch("/api/sesion");
  const data = await res.json();
  res.data = data;
  if (res.ok) { 
    
    dispatch(receiveUser(data.user));
  } else {
   
    throw res;
  }
};

const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user,
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
      case ACTION:
      action.payload.forEach((element)=>{
        allIdsArray.push(element.id)
        byIds[element.id]=element
       })
      newState['byId']=byIds
      newState['allIds']=allIdsArray
      return newState;
     
     default:
      return state
   }}