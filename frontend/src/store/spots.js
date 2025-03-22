import { csrfFetch } from './csrf';


// ----ACTION TYPES---
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const CREATE_SPOT = "create/CREATE_SPOT";
const UPDATE_SPOT = "update/UPDATE_SPOT";
const DELETE_SPOT = "delete/DELETE_SPOT";
const GET_SPOT_DETAILS = "view spot details/GET_SPOT_DETAILS";

//ACTION CREATORS
//----step  6 : package the data into an action object

// Action creator for getting all spots
const getAllSpots = (spots) => {
 return{
  type: GET_ALL_SPOTS,
  payload: spots
 } 
};



// Action creator for creating a new spot
export const createSpot = (newSpot) => ({
  type: CREATE_SPOT,
  payload: newSpot,
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
// Action creator for getting spot details
export const getSpotDetails = (spotDetails) => ({
  type: GET_SPOT_DETAILS,
  payload: spotDetails,
});

///


//----THUNKS----

export const getAllSpotsThunk = () => async (dispatch) => {
  //step 1: fetch the data from the backend server
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
      } else {
          throw new Error('Failed to create spot');
      }
  } catch (error) {
      console.log('Error creating spot:', error);
  }
};


export const updateSpotThunk = (newSpot) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      body: JSON.stringify(newSpot),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const updateSpot = await response.json();
      dispatch(updateSpot(updateSpot));
    } else {
      throw new Error('Failed to create spot');
    }
  } catch (error) {
    console.log('Error creating spot:', error);
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  try {
      const response = await csrfFetch(`/api/spots/${spotId}`, {
          method: 'DELETE',
      });
      if (response.ok) {
          dispatch(deleteSpot(spotId)); // Pass the ID to the action creator
      } else {
          throw new Error('Failed to delete spot');
      }
  } catch (error) {
      console.log('Error deleting spot:', error);
  }
};


export const getSpotDetailsThunk = (id) => async (dispatch) => {
  //step 1: fetch the data from the backend server
  try {
    console.log("step 3)");
    const response = await csrfFetch(`/api/spots/${id}`);
    console.log("step 5)");

    if (!response.ok) {
      const spotDetails = await response.json();
      console.log("spotDetails");
      dispatch(getSpotDetails(spotDetails));
    } else {
      throw new Error('Failed to fetch spots');
    }

  } catch (error) {
    console.log('Error fetching spots:', error);
  }
}


//<-------REDUCERS----->

// Step 1: Normalizing our state
const initialState = {
  allSpots: [],
  byId: {},
  currentSpot: null // To hold the details of the currently selected spot
};


// Step 3: Reducer
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const spotsArr = action.payload.Spots;
      const newState = { ...state }; // Make a copy of state
      newState.allSpots = spotsArr;
      newState.byId = {};
      
      for (let spot of spotsArr) {
        newState.byId[spot.id] = spot; // Normalize the spots by ID
      }
      return newState;
    }

    case CREATE_SPOT: {
      const newSpot = action.payload.spot;
      const newState = { ...state };
      newState.allSpots = [...newState.allSpots, newSpot]; // Add new spot to the array
      newState.byId[newSpot.id] = newSpot; // Add new spot to byId
      return newState;
    }

    case UPDATE_SPOT: {
      const updatedSpot = action.payload.spot;
      const newState = { ...state };
      newState.allSpots = newState.allSpots.map(spot =>
        spot.id === updatedSpot.id ? updatedSpot : spot // Update the specific spot
      );
      newState.byId[updatedSpot.id] = updatedSpot; // Update the spot in byId
      return newState;
    }

    case DELETE_SPOT: {
      const spotIdToDelete = action.payload.id;
      const newState = { ...state };
      newState.allSpots = newState.allSpots.filter(spot => spot.id !== spotIdToDelete); // Remove the spot
      delete newState.byId[spotIdToDelete]; // Remove from byId
      return newState;
    }

    case GET_SPOT_DETAILS: {
      const spotIdToGet = action.payload.id;
      const newState = { ...state };
      newState.currentSpot = newState.byId[spotIdToGet] || null; // Fetch the spot details by ID
      return newState;
    }

    default:
      return state;
  }
};

export default spotsReducer;
