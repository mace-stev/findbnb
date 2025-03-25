import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotdetailsThunk } from '../../store/spots';
import './GetSpotdetails.css'

import largeImage from '../../images/outdoors.jpg'; // Use your preferred large image
import smallImage1 from '../../images/cliffhouse.png';
import smallImage2 from '../../images/treetop.png';
import smallImage3 from '../../images/grapevine.png';
import smallImage4 from '../../images/wisteria.png';

const GetSpotdetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentSpot = useSelector((state) => state.spots.currentSpot);
    const loading = useSelector((state) => state.spots.loading);
    const error = useSelector((state) => state.spots.error);

    useEffect(() => {
        dispatch(getSpotdetailsThunk(id));
    }, [dispatch, id]);

    // Loading state
    if (loading) return <div>Loading...</div>;

    // Error state
    if (error) return <div>Error fetching spot: {error}</div>;

    // No spot found
    if (!currentSpot) return <div>No spot found.</div>;

    // Destructure currentSpot and provide default values
    const {
        name,
        city,
        state,
        country,
        description,
        price,
        reviews = []
    } = currentSpot;

    // Dummy average rating and review count
    const averageRating = 4.5; // Dummy data
    const reviewCount = reviews.length;

    return (
        <div className="spot-details">
            <h2>{name}</h2>
            <p>Location: {city}, {state}, {country}</p>
            <div className="container">
                <h2 className="title">treetopBnB Gallery</h2>
                <div className="photo-gallery">
                    <div className="column">
                        <div className="photo">
                            <img src={largeImage} alt="Blissful outdoors" className="large-image" />
                        </div>
                    </div>
                    <div className="column">
                        <div className="photo">
                            <img src={smallImage1} alt="Blissful outdoors" />
                        </div>
                        <div className="photo">
                            <img src={smallImage2} alt="Blissful outdoors" />
                        </div>
                        <div className="photo">
                            <img src={smallImage3} alt="Blissful outdoors" />
                        </div>
                        <div className="photo">
                            <img src={smallImage4} alt="Blissful outdoors" />
                        </div>
                    </div>
                </div>
            </div>
            <p>Description: {description}</p>
            <div className="callout-info">
                <p>Price: ${price} per night</p>
                <button onClick={() => alert("Feature coming soon")}>Reserve</button>
            </div>
            {/* Rating and reviews section */}
            <div className="review-summary">
                <span className="star-icon">⭐</span>
                {averageRating} {reviewCount > 0 && (
                    <>
                        <span> - </span>
                        {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
                    </>
                )}
            </div>
            {reviewCount === 0 ? (
                <p>Be the first to post a review!</p>
            ) : (
                <div className="reviews-list">
                    {reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((review, index) => (
                        <div key={index} className="review">
                            <p>{review.firstName} - {new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GetSpotdetails;