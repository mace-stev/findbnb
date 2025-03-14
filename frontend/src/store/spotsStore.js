
export const SET_SPOTS = 'spots/setSpots';
export const SET_SPOT = 'spots/setSpot';
export const fetchSpots = () => async (dispatch) => {
  const res = await fetch(`api/spots`); 
  const data = await res.json();
  res.data = data;
  if (res.ok) { 
    
    dispatch(receiveSpots(data.Spots));
  } else {
   
    throw res;
  }
};

const receiveSpots = (spots) => {
  return {
    type: SET_SPOTS,
    payload: spots,
  };
};
const receiveSpot = (spot) => {
  return {
    type: SET_SPOT,
    payload: spot,
  };
};
export const fetchSpot = (id) => async(dispatch)=>{
  const res = await fetch(`api/spots/${id}`); 
  const data = await res.json();
  res.data = data;
  if (res.ok) { 
    
    dispatch(receiveSpot(data));
  } else {
   
    throw res;
  }
}



export default function spotsReducer( state={}, action){
    const newState={};
    let allIdsArray=[...state?.allIds|| []]
    let byIds={...state?.byId|| {}}
     switch(action.type){
      case SET_SPOTS:
      action.payload?.forEach((element)=>{
        allIdsArray.push(element.id)
        byIds[element.id]=element
       })
      newState['byId']=byIds
      newState['allIds']=allIdsArray
      return newState;
      case SET_SPOT:
        allIdsArray=[]
        byIds={}
        allIdsArray.push(action.payload.id)
        byIds[action.payload.id]=action.payload
      newState['byId']=byIds
      newState['allIds']=allIdsArray
      return newState;
     default:
      return state
   }}