
import React from 'react';
import { useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';





const Spots = () => {
  // hook function that runs on component mount
const dispatch = useDispatch();

const [spots, setSpots] = useState([]);
const [isLoaded, setIsLoaded] = useState(false);


useEffect(() => {
  //step 2: fetch the data from the backend server component mount
  
// dispatch(getAllSpots());
const getData = async () => {
dispatch(getAllSpots());



  setIsLoaded(true);
  //setSpots(data);
  console.log(data);
}


if (!isLoaded) {
getData();
}

}, [spots, isLoaded]);

  return (
    <div className='spots_container'>
      {spots.map((spot, idx) => (
        <div key={`${idx} -${spot.id}`}>
          <Link to={`/spots/${spot.id}`}></Link>
          <img src={spot.imageUrl} alt={spot.name} />
          <h2>{spot.name}</h2>
          <p>{spot.description}</p>
          <p>{`$${spot.price}`}</p>
        </div>
      ))}
      
    </div>
  );
}


export default Spots;
