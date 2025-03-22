
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllSpotsThunk } from '../../store/spots'; 
import './Spots.css';

const Spots = () => {
    const dispatch = useDispatch();
    const allSpots = useSelector(state => state.spots.allSpots); // Fixed selector syntax
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
      const getSpots = async () => {
        await dispatch(getAllSpotsThunk());
        setIsLoaded(true); // Set loading to true after dispatch
      };
      getSpots(); // Call the function to get spots
    }, [dispatch]); // Dependency array with dispatch
  
    // Optional loading state
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
  
    // Check if there are no spots available
    if (allSpots.length === 0) {
      return <div>No spots available</div>;
    }
  
    return (
      <div className='spots_container'>
        {allSpots.map((spot, idx) => (
          <div key={`${idx}-${spot.id}`} className='spot_tile'>
            <Link to={`/spots/${spot.id}`} className='spot_link'>
              <img src={spot.imagesUrl} alt={spot.name} className='spot_image' />
              <div className='spot_details'>
                <div className='spot_location'>
                  {spot.city}, {spot.state}
                </div>
                <div className='spot_price'>
                  ${spot.price} night
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  };
  
export default Spots;