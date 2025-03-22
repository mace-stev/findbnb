import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotDetailsThunk } from '../../store/spots'; 
import './SpotDetails.css'; 




const SpotDetails = () => {
  const { id } = useParams(); // Get the spot ID from the URL
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.byId[id]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("Spot ID: ", id); // Log the ID for debugging
    if (id) { // Check if the ID is defined
      const getSpotDetails = async () => {
        await dispatch(getSpotDetailsThunk(id)); // Fetch spot details using thunk
        setIsLoaded(true); // Set loading to true after dispatch
      };
      getSpotDetails(); // Call the function to get spot details
    }
  }, [dispatch, id]); // Dependency array with dispatch and id

  const handleReserve = () => {
    alert("Feature coming soon");
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!spot) {
    return <div>Spot not found</div>; // Handle not found case
  }

  return (
    <div className="spot-details-container">
      <h1>{spot.name}</h1>
      <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
      <img src={spot.previewImage} alt={spot.name} className="spot-preview-image" />
      <div className="spot-images">
        {spot.images.map((image, idx) => (
          <img key={idx} src={image} alt={`Spot image ${idx + 1}`} className="spot-image" />
        ))}
      </div>
      <p>Hosted by {spot.host.firstName} {spot.host.lastName}</p>
      <p>{spot.description}</p>
      <div className="callout">
        <p>${spot.price} night</p>
        <button onClick={handleReserve}>Reserve</button>
      </div>
    </div>
  );
};

export default SpotDetails;