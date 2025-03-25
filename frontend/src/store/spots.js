
import { csrfFetch } from './csrf';


// ----ACTION TYPES---
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
//const GET_SPOT = 'spots/GET_SPOT';
const CREATE_SPOT = "create/CREATE_SPOT";
const UPDATE_SPOT = "update/UPDATE_SPOT";
const DELETE_SPOT = "delete/DELETE_SPOT";
const GET_SPOT_DETAILS = "spot details/GET_SPOT_DETAILS";

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

// Action creator for updating an existing spot
export const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  payload: spot,
});

// Action creator for deleting a spot
export const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  payload: spotId,
});

//----THUNKS----

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
};

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
      console.log('Error creating spot:', error.message);
  }
};


//---UpdateSpotThunk--->
export const updateSpotThunk = (spotId, updatedData) => async (dispatch) => {
  try {
      const intSpotId = parseInt(spotId, 10); // Convert to integer
      console.log("Updating spot with ID:", intSpotId); // Log the ID

      if (isNaN(intSpotId)) {
          throw new Error("Invalid spot ID: must be a valid integer.");
      }

      const url = `/api/spots/${intSpotId}`; // Create the URL
      console.log("Fetching URL:", url);

      console.log("Updated data being sent:", updatedData); // Log updated data

      const response = await csrfFetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
      });

      if (response.ok) {
          const updatedSpot = await response.json();
          console.log("Updated spot firing:", updatedSpot);
          dispatch(updateSpot(updatedSpot));
      } else {
          const errorResponse = await response.json(); // Read the response body
          console.error("Error response:", errorResponse); // Log error details
          throw new Error('Failed to update spot');
      }
  } catch (error) {
      console.error('Error updating spot:', error);
  }
};

//---->DeleteSpotThunk--->
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
  } catch (error) {
      console.log('Error deleting spot:', error);
  }
};



//<-------REDUCERS----->

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


//----->GetSpotDeatils Reducer----> 
    
    case GET_SPOT_DETAILS: {
      const spot = action.payload; 
      return {
          ...state,
          currentSpot: spot, 
      };
  }
 //----->CreateSpot Reducer----> 
 case 'UPDATE_SPOT': {
  const updatedSpot = action.payload; 
  return {
      ...state,
      allSpots: state.allSpots.map((spot) =>
          spot.id === updatedSpot.id ? updatedSpot : spot
      ),
      byId: {
          ...state.byId,
          [updatedSpot.id]: updatedSpot, 
      },
      currentSpot: updatedSpot, 
  };
}
  //----->UpdateSpot Reducer----> 
  case UPDATE_SPOT: {
    const updatedSpot = action.payload; 
    return {
        ...state,
        allSpots: state.allSpots.map((spot) =>
            spot.id === updatedSpot.id ? updatedSpot : spot 
        ),
        byId: {
            ...state.byId,
            [updatedSpot.id]: updatedSpot, 
        },
        currentSpot: updatedSpot,
    };
}
//----->DeleteSpot Reducer----> 
    case DELETE_SPOT: {
      const spotIdToDelete = action.payload.id;
      const newState = { ...state };
      newState.allSpots = newState.allSpots.filter(spot => spot.id !== spotIdToDelete);
      delete newState.byId[spotIdToDelete]; 
      return newState;
    }


    default:
      return state;
  }
};

export default spotsReducer;
