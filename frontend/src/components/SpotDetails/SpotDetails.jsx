import './SpotDetails.css'

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaImage } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { fetchSpot } from '../../store/spotsStore'
import { fetchSpotReviews } from '../../store/reviewsStore';
import { FaStar } from "react-icons/fa"
import NewReview from '../NewReview';
import React from 'react';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReview from '../DeleteReview';
function SpotDetails() {
    const initialSpot = useSelector(state => state.spots)
    const initialReviews = useSelector(state => state.reviews)
    const user = useSelector(state => state.session)
    const [spot, setSpot] = useState();
    const [reviews, setReviews] = useState();
    const dispatch = useDispatch()
    const { id } = useParams()
    const oneUser = user?.byId ? Object.values(user?.byId) : [];
    const currUser = Object.values(oneUser)[0];
    useEffect(() => {
        dispatch(fetchSpot(id))
        dispatch(fetchSpotReviews(id))

    }, [dispatch, id])

    useEffect(() => {
        setSpot(initialSpot)
        setReviews(initialReviews)
    }, [initialSpot, initialReviews])
    const oneSpot = spot?.byId ? Object.values(spot.byId) : [];
    const spotReviews = reviews?.byId ? Object.values(reviews.byId) : [];

    return (<section className="body-section">
        {Object.values(oneSpot)?.map((element) => {
            return (<div key={element.id}>
                <div>
                    <h1 className="spot-details-title">{element?.name}</h1>
                    <h3>{`${element?.city}, ${element?.state}, ${element?.country}`}</h3>
                </div>
                <div className='spot-details-image-container'>
                    <div className="spot-details-main-image-container">
                        {element?.SpotImages?.[0]?.url ? (
                            <img className="spotImage-main" src={element?.SpotImages?.[0]?.url} />
                        ) : (
                            <FaImage className="spotImage" color="gray" />
                        )}
                    </div>
                    <div className="spot-details-secondary-image-container">
                        {element.SpotImages?.[1]?.url ? (
                            <img className="spotImage" id="spotImage1" src={element.SpotImages[1].url} />
                        ) : (
                            <FaImage className="spotImage" id="spotImage1" color="gray" />
                        )}
                        {element?.SpotImages?.[2]?.url ? (
                            <img className="spotImage" id="spotImage2" src={element?.SpotImages?.[2]?.url} />
                        ) : (
                            <FaImage className="spotImage" id="spotImage2" color="gray" />
                        )}
                        {element?.SpotImages?.[3]?.url ? (
                            <img className="spotImage" id="spotImage3"src={element?.SpotImages?.[3]?.url} />
                        ) : (
                            <FaImage className="spotImage" id="spotImage3" color="gray" />
                        )}
                        {element?.SpotImages?.[4]?.url ? (
                            <img className="spotImage" id="spotImage4"src={element?.SpotImages?.[4]?.url} />
                        ) : (
                            <FaImage className="spotImage" id="spotImage4" color="gray" />
                        )}
                    </div>
                </div>
                <div className="spot-details-description-container">
                    <div className="spot-details-description">
                        <h2 className="spot-details-host">{`Hosted by ${element?.Owner?.firstName} ${element?.Owner?.lastName}`}</h2>
                        <p>{`${element?.description}`}</p>
                
                    <div className="spot-details-review-header-container">
                        <FaStar className='star' />
                        <h3>{element?.avgStarRating?.toFixed(1)}</h3>
                        <h3 className="reviews-num">{`${spotReviews.length} reviews`}</h3>
                    </div>
                    {currUser && currUser.id !== element.ownerId && (
                        <button className="spot-button"><OpenModalMenuItem
                            itemText="Post Your Review"
                            onItemClick={() => {
                                return (<div className="menu-overlay"></div>)
                            }}
                            onModalClose={() => {
                                dispatch(fetchSpot(id))
                                dispatch(fetchSpotReviews(id))
                            }}
                            modalComponent={<NewReview spotId={element.id} userId={currUser.id} />}

                        /></button>
                    )}
                     </div>
                    <div className="reserve-button-container">
                        <div className="reserve-button-container-top">
                            <p className="price-element">{<span className="spot-price-span">{`$${element?.price}`}</span>} night</p>
                            <div className="spot-details-review-header-container" id="reserve-button-header-section">
                                <FaStar className='star' />
                                <h3>{element?.avgStarRating?.toFixed(1)}</h3>
                                <h3 className="reviews-num">{`${spotReviews.length} reviews`}</h3>
                            </div>
                        </div>
                        <button onClick={()=>{
                            return alert("Feature Coming Soon...")
                        }} className='reserve-button'>Reserve</button>
                    </div>
                </div>

            </div>)
        })}
        {Object.values(spotReviews).map((element) => {
            return (<div key={element.id}>
                <div className="review">
                    <h4>{element?.User?.firstName || element?.firstName}</h4>
                    <h4 className="review-date">{`${element?.createdAt.slice(5, 7)} ${element.createdAt.slice(0, 4)}`}</h4>
                    <p>{element?.review}</p>
                </div>
                {currUser && currUser.id === element.userId && (
                    <button className="spot-button">
                        <OpenModalMenuItem
                            itemText="Delete"
                            onItemClick={() => {
                                return (<div className="menu-overlay"></div>)
                            }}
                            modalComponent={<DeleteReview reviewId={element.id} spotId={id} />}
                            onModalClose={() => {
                                dispatch(fetchSpot(id))
                                dispatch(fetchSpotReviews(id))
                            }}
                        />
                    </button>
                )}

            </div>)
        })}
    </section>)
}
export default SpotDetails;