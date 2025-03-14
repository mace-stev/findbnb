import './SpotDetails.css'

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaImage } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { fetchSpot } from '../../store/spotsStore'
import { fetchSpotReviews } from '../../store/reviewsStore';
import {FaStar} from "react-icons/fa"
function SpotDetails(){
    const spot = useSelector(state => state.spots)
    const reviews = useSelector(state => state.reviews)
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(() => {
        dispatch(fetchSpot(id))
        dispatch(fetchSpotReviews(id))
       
    }, [dispatch, id])
    const oneSpot = spot?.byId ? Object.values(spot.byId) : [];
    const spotReviews = reviews?.byId ? Object.values(reviews.byId): [];
    console.log(spotReviews)
    return(<>
    {Object.values(oneSpot)?.map((element)=>{
        return(<>
        <h1 className="spot-details-title">{element?.name}</h1>
        <h3>{`${element?.city}, ${element?.state}, ${element?.country}`}</h3>
        <div className='spot-details-image-container'>
            <div className="spot-details-main-image-container">
            {element?.SpotImages?.[0]?.url ? (
                            <img className="spotImage-main" src={element?.SpotImages?.[0]?.url}  />
                        ) : (
                            <FaImage className="spotImage" color="gray" />
                        )}
            </div>
            <div className="spot-details-secondary-image-container">
            {element.SpotImages?.[1]?.url ? (
                            <img className="spotImage" src={element.SpotImages[1].url}  />
                        ) : (
                            <FaImage className="spotImage" color="gray" />
                        )}
                        {element?.SpotImages?.[2]?.url ? (
                            <img className="spotImage" src={element?.SpotImages?.[2]?.url}  />
                        ) : (
                            <FaImage className="spotImage" color="gray" />
                        )}
                        {element?.SpotImages?.[3]?.url ? (
                            <img className="spotImage" src={element?.SpotImages?.[3]?.url}  />
                        ) : (
                            <FaImage className="spotImage" color="gray" />
                        )}
                        {element?.SpotImages?.[4]?.url ? (
                            <img className="spotImage" src={element?.SpotImages?.[4]?.url}  />
                        ) : (
                            <FaImage className="spotImage" color="gray" />
                        )}
            </div>
        </div>
        <div className="spot-details-desciption">
            <h2 className="spot-details-host">{`Hosted by ${element?.Owner?.firstName} ${element?.Owner?.lastName}`}</h2>
            <p>{`${element?.description}`}</p>
        </div>
        <div className="spot-details-review-header-container">
                <FaStar/>
                <h3>{element?.avgStarRating?.toFixed(1)}</h3>
                <h3 className="reviews-num">{`${element?.numReviews} reviews`}</h3>
            </div>

        </>)
    })}
    {Object.values(spotReviews).map((element)=>{
        return(<>
        <div className="review">
            <h4>{element?.User?.firstName}</h4>
            <h4 className="review-date">{`${element?.createdAt.slice(5,7)} ${element.createdAt.slice(0, 4)}`}</h4>
            <p>{element?.review}</p>
        </div>
        
        </>)
    })}
    </>)
}
export default SpotDetails;