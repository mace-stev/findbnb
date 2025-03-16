


///




//----THUNK----

export const getAllSpots = () => async (dispatch) => {
    //step 1: fetch the data from the backend server
try {
console.log("hello from thunk");
if(response.ok) {
  const data = await response.json();
}else{
    throw new Error('Failed to fetch spots');
}

const response = await fetch('/api/spots');
  const data = await response.json();
  setSpots(data);

} catch (error) {
  console.log('Error fetching spots:', error);
}


}
//-------REDUCERS-----

let initialState = {
  spots: [],
  spot: {},
  spotReviews: [],
  spotImages: [],
  spotBookings: [],
  spotAmenities: [],
};
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SPOTS': {
      const newState = { ...state };
      newState.spots = action.payload;
      return newState;
    }
    case 'SET_SPOT': {
      const newState = { ...state };
      newState.spot = action.payload;
      return newState;
    }
    case 'SET_SPOT_REVIEWS': {
      const newState = { ...state };
      newState.spotReviews = action.payload;
      return newState;
    }
    case 'SET_SPOT_IMAGES': {
      const newState = { ...state };
      newState.spotImages = action.payload;
      return newState;
    }
    case 'SET_SPOT_BOOKINGS': {
      const newState = { ...state };
      newState.spotBookings = action.payload;
      return newState;
    }
    case 'SET_SPOT_AMENITIES': {
      const newState = { ...state };
      newState.spotAmenities = action.payload;
      return newState;
    }
    default:
      return state;
  }
};
export default spotsReducer;
