
export const RECEIVE_SPOTS = 'RECEIVE_SPOTS';

export const fetchSpots = () => async (dispatch) => {
  const res = await fetch(`/SPOTS`); 
  const data = await res.json();
  res.data = data;
  if (res.ok) { 
    
    dispatch(receiveSpots(data.spots));
  } else {
   
    throw res;
  }
};

const receiveSpots = (spots) => {
  return {
    type: RECEIVE_SPOTS,
    spots,
  };
};


export default function spotsReducer( state={}, action){
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