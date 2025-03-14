
export const SET_SPOTS = 'spots/setSpots';

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
     
     default:
      return state
   }}