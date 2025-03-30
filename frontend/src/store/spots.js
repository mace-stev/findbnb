
import { csrfFetch } from './csrf';

// ----ACTION TYPES---
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_SPOT_DETAILS = "spot details/GET_SPOT_DETAILS";
const CREATE_SPOT = "create/CREATE_SPOT";
const ADD_REVIEW = "review/ADD_REVIEW";
const FETCH_SPOTS = "fetch/FETCH_SPOTS";
const UPDATE_SPOT = "update/UPDATE_SPOT";
const DELETE_SPOT = "delete/DELETE_SPOT";

//ACTION CREATORS
//----step  6 : package the data into an action object

// Action creator for getting all spots
export const getAllSpots = (spots) => {
 return{
  type: GET_ALL_SPOTS,
  payload: spots
 } 
};


// Action creator for creating a new spot
export const getSpotdetails = (spot) => {
  return{
   type: GET_SPOT_DETAILS,
   payload: spot,
  } 
 };

// Action creator for creating a new spot
export const createSpot = (newSpot) => ({
  type: CREATE_SPOT,
  payload: newSpot,
});

// Action creator for posting a review on a spot
export const postReview = (reviewData) => ({
  type: ADD_REVIEW,
  payload: reviewData
});

export const fetchSpots = (spots) => ({
    type: FETCH_SPOTS,
    payload: spots,
});

// Action creator for updating an existing spot
export const updateSpot = (updatedSpot) => ({
  type: UPDATE_SPOT,
  payload: updatedSpot,
});

// Action creator for deleting a spot
export const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  payload: spotId,
});

//THUNKS

//getAllSpots

export const getAllSpotsThunk = () => async (dispatch) => {

  try {
    console.log("step 3)");
    const response = await csrfFetch('/api/spots');
    console.log("step 5)");

    if (response.ok) {
      const spots = await response.json();
      console.log("spots");
      dispatch(getAllSpots(spots));
    } else {
      throw new Error('Failed to fetch spots');
    }

  } catch (error) {
    console.log('Error fetching spots:', error);
  }
}

//GetSpotDetailsthunk

export const getSpotdetailsThunk = (spotId) => async (dispatch) => {
  try {
      const response = await csrfFetch(`/api/spots/${spotId}`);
      
      if (response.ok) {
          const spot = await response.json();
          dispatch(getSpotdetails(spot)); 
      } else {
          throw new Error('Failed to fetch spot');
      }
  } catch (error) {
      console.error('Error fetching spot:', error);
      
  }
}

//createSpotThunk
export const createSpotThunk = (newSpot) => async (dispatch) => {
  try {
      const response = await csrfFetch('/api/spots', {
          method: 'POST',
          body: JSON.stringify(newSpot),
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.ok) {
          const createdSpot = await response.json();
          dispatch(createSpot(createdSpot)); 
          return createdSpot; 
      } else {
          throw new Error('Failed to create spot');
      }
  } catch (e) {
      console.log('Error creating spot:', e.message);
      throw (e); 
  }
};

//---->postReviewThunk

export const postReviewThunk = (spotId, reviewData) => async (dispatch) => {
 
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
  });
  
  if (response.ok) {
      const data = await response.json();
      dispatch({ type: 'ADD_REVIEW', payload: { spotId, review: data } });
  } else {
      
      console.error('Failed to post review');
  }
};

//FetchSpotsThunk
export const fetchSpotsThunk = () => {
    return async (dispatch) => {
        try {
            const response = await csrfFetch('/api/spots');
            if (!response.ok) {
                throw new Error('Failed to fetch spots');
            }
            const data = await response.json();
            console.log('Fetched data:', data);
            dispatch(fetchSpots(data)); 
        } catch (e) {
            console.error('Error fetching spots:', e);
        }    
    };
};

//UpdateSpotThunk
export const updateSpotThunk = (spotId, updatedData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Failed to update the spot');
        }

        const updatedSpot = await response.json();
        dispatch({ type: 'UPDATE_SPOT', payload: updatedSpot }); 
    } catch (e) {
        console.error('Error updating spot:', e);
    }
};
//DeleteSpotThunk
export const deleteSpotThunk = (spotId) => async (dispatch) => {
  try {
      const response = await csrfFetch(`/api/spots/${spotId}`, {
          method: 'DELETE',
      });
      if (response.ok) {
          dispatch(deleteSpot(spotId)); 
      } else {
          throw new Error('Failed to delete spot');
      }
  } catch (e) {
      console.log('deleting spot:', e);
  }
};


// Reducers

// Step 1: Normalizing our state
const initialState = {
  allSpots: [],
  byId: {},
  currentSpot: null,
};

// Step 3: Reducer
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_ALL_SPOTS: {
          const spotsArr = action.payload.Spots;
          const newState = { ...state };
          newState.allSpots = spotsArr;
          newState.byId = {};
          for (let spot of spotsArr) {
              newState.byId[spot.id] = spot;
          }
          return newState;
      }

      // GetSpotDetails Reducer
      case GET_SPOT_DETAILS: {
          const spot = action.payload;
          return {
              ...state,
              currentSpot: spot,
          };
      }

      // CreateSpot Reducer
      case CREATE_SPOT: {
          const newSpot = action.payload;
          const newState = {
              ...state,
              allSpots: [...state.allSpots, newSpot],
              byId: { ...state.byId, [newSpot.id]: newSpot },
              currentSpot: newSpot,
          };
          return newState;
      }
//Fetchspots Reducer

case FETCH_SPOTS: {
    const spotsArr = action.payload.Spots
    const newState = { ...state};
    newState.allSpots = spotsArr;
    newState.byId = {};
        
    for (let spot of spotsArr) {
        newState.byId[spot.id] = spot;
    }
    return newState;
}

      // UpdateSpot Reducer
      case UPDATE_SPOT: {
          const updatedSpot = action.payload;
          return {
              ...state,
              allSpots: state.allSpots.map(spot => 
                  spot.id === updatedSpot.id ? updatedSpot : spot
              ),
              byId: { ...state.byId, [updatedSpot.id]: updatedSpot },
              currentSpot: updatedSpot,
          };
      }

      // DeleteSpot Reducer
      case DELETE_SPOT: {
          const spotIdToDelete = action.payload.id;
          const newState = { ...state };
          newState.allSpots = newState.allSpots.filter(spot => spot.id !== spotIdToDelete);
          delete newState.byId[spotIdToDelete];
          return newState;
      }

      // Post Review Reducer
      case ADD_REVIEW: {
          const { spotId, review } = action.payload;
          const spot = state.byId[spotId];

    
          if (spot) {
              const updatedSpot = {
                  ...spot,
                  reviews: [...(spot.reviews || []), review],  
              };

              return {
                  ...state,
                  byId: {
                      ...state.byId,
                      [spotId]: updatedSpot, 
                  },
                  currentSpot: updatedSpot, 
              };
          }
          return state; 
      }

      default:
          return state;
  }
};

export default spotsReducer;