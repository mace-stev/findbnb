
export const SET_REVIEWS = 'spots/setReviews';


const receiveReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    payload: reviews,
  };
};


export const fetchSpotReviews = (id) => async (dispatch) => {
  const res = await fetch(`api/spots/${id}/reviews`); 
  const data = await res.json();
  res.data = data;
  if (res.ok) { 
    
    dispatch(receiveReviews(data));
  } else {
   
    throw res;
  }
};


export default function reviewsReducer( state={}, action){
    const newState={};
    let allIdsArray=[...state?.allIds|| []]
    let byIds={...state?.byId|| {}}
     switch(action.type){
      case SET_REVIEWS:
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