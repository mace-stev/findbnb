
export const SET_SPOTS = 'spots/setSpots';
export const SET_SPOT = 'spots/setSpot';
export const REMOVE_SPOT = 'spots/removeSpot';
import { csrfFetch } from './csrf';
export const fetchSpots = () => async (dispatch) => {
  const res = await fetch(`/api/spots`);
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
export const fetchSpot = (id) => async (dispatch) => {
  const res = await fetch(`/api/spots/${id}`);
  const data = await res.json();
  res.data = data;
  if (res.ok) {

    dispatch(receiveSpot(data));
    return id
  } else {

    throw res;
  }
}
export const addSpot = (spot) => async (dispatch) => {
  const { address, city, state, country, lat, lng, name, description, price } = spot;
  const response = await csrfFetch("/api/spots/", {
    method: "POST",
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    })
  });
  const data = await response.json();
  dispatch(receiveSpot(data));
  return data;
};

export const editSpot = (spot) => async (dispatch) => {
  const { id, address, city, state, country, lat, lng, name, description, price } = spot;
  const response = await csrfFetch(`/api/spots/${id}/`, {
    method: "PUT",
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    })
  });
  const data = await response.json();
  dispatch(receiveSpot(data));
  return data;
};


export const editSpotImages = (spotImage) => async (dispatch) => {
  const { id, spotId, url, preview} = spotImage;
  const response = await csrfFetch(`/api/spots/${spotId}/images/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      url,
      preview
    })
  });
  const data = await response.json();
  dispatch(receiveSpots(data.Spots));
  return data;
};



export const deleteSpot = (spotId) => async (dispatch) =>{
  const response = await csrfFetch(`/api/spots/${spotId}/`, {
    method: "DELETE",
 
  });
  const data = await response.json();
  dispatch(removeSpot(spotId))
  return data;
}
export const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  spotId
});
export const addSpotImage = (spot) => async (dispatch) => {
  const { spotId, url, preview } = spot;
  const res = await fetch(`/api/spots/${spotId}`);
  const data = await res.json();
  res.data = data;
  if (res.ok) {
  const response = await csrfFetch(`/api/spots/${spotId}/images/`, {
    method: "POST",
    body: JSON.stringify({
      url,
      preview
    })
  })
  dispatch(receiveSpots(data.Spots));
  return response;
};
  
  
};
export const getUsersSpots = () => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/current/`);
  const data = await res.json();
  res.data = data;
  if (res.ok) {

    dispatch(receiveSpots(data.Spots));
  } else {

    throw res;
  }
}

const initialState = { allIds: [], byId: {} };
export default function spotsReducer(state = initialState, action) {
  const newState = {};
  let allIdsArray = []
  let byIds = {}
  switch (action.type) {
    case SET_SPOTS:
      
      action.payload?.forEach((element) => {
        allIdsArray.push(element.id)
        byIds[element.id] = element
      })
      newState['byId'] = byIds
      newState['allIds'] = allIdsArray
      return newState;
    case SET_SPOT:
      allIdsArray = []
      byIds = {}
      allIdsArray.push(action.payload.id)
      byIds[action.payload.id] = action.payload
      newState['byId'] = byIds
      newState['allIds'] = allIdsArray
      return newState;
    case REMOVE_SPOT:
      allIdsArray=state.allIds.filter((element)=>element!==action.spotId)
      byIds={...state.byId}
      newState['byId'] = byIds
      newState['allIds'] = allIdsArray
      delete newState.byId[action.spotId]
      return newState;
    default:
      return state
  }
}