
export const SET_SPOTS = 'spots/setSpots';
export const SET_SPOT = 'spots/setSpot';
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
export const addSpotImage = (spot) => async (dispatch) => {
  const { spotId, url, preview } = spot;
  const response = await csrfFetch(`/api/${spotId}/images/`, {
    method: "POST",
    body: JSON.stringify({
      url,
      preview
    })
  });
  const data = await response.json();
  dispatch(receiveSpot(data));
  return response;
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
    default:
      return state
  }
}