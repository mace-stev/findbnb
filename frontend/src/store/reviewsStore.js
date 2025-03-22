
export const SET_REVIEWS = 'spots/setReviews';
export const REMOVE_REVIEW = 'spots/removeReview';
import { csrfFetch } from './csrf';

const receiveReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    payload: reviews,
  };
};


export const fetchSpotReviews = (id) => async (dispatch) => {
  const res = await fetch(`/api/spots/${id}/reviews/`); 
  const data = await res.json();
  res.data = data;
  if (res.ok) { 
    
    dispatch(receiveReviews(data));
  } else {
   
    throw res;
  }
};

export const addReview = (reviewToAdd) => async (dispatch) => {
  const { spotId, review, stars, userId } = reviewToAdd;
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify({
      spotId,
      review,
      stars,
      userId
    })
  });
  const data = await response.json();
  dispatch(receiveReviews(data));
  return data;
};

export const deleteReview = (reviewId) => async (dispatch) =>{
  const response = await csrfFetch(`/api/reviews/${reviewId}/`, {
    method: "DELETE",
 
  });
  const data = await response.json();
  dispatch(removeReview(reviewId))
  return data;
}
export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId
});

export const editSpot = (reviewToEdit) => async (dispatch) => {
  const {  review, stars, reviewId } = reviewToEdit;
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    body: JSON.stringify({
      review,
      stars
    })
  });
  const data = await response.json();
  dispatch(receiveReviews(data));
  return data;
};

const initialState = {allIds: [], byId: {}};
export default function reviewsReducer(  state=initialState, action){
    const newState={};
    let allIdsArray=[]
    let byIds={}
     switch(action.type){
      case SET_REVIEWS:
      action.payload?.forEach((element)=>{
        allIdsArray.push(element.id)
        byIds[element.id]=element
       })
      newState['byId']=byIds
      newState['allIds']=allIdsArray
      return newState;
      case REMOVE_REVIEW:
            allIdsArray=state.allIds.filter((element)=>element!==action.reviewId)
            byIds={...state.byId}
            newState['byId'] = byIds
            newState['allIds'] = allIdsArray
            delete newState.byId[action.spotId]
            return newState;
      
     default:
      return state
   }}