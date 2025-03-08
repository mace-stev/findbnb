
export const RECEIVE_USER = 'RECEIVE_USER';

export const fetchUser = () => async (dispatch) => {
  const res = await fetch(`/current`); 
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


export default function userReducer( state={}, action){
    const newState={...state};
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