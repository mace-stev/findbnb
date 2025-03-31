import './Review.css'; 

const Review = ({ review }) => {
    
    if (!review || !review.createdAt) {
        return <div>Review data is not available.</div>; 
    }

    
    const formattedDate = new Date(review.createdAt).toLocaleDateString();


    const userName = review.user && review.user.firstName ? review.user.firstName : 'Confirmed Guest';

    return (
        <div className="review">
            <h3>
                {userName} <span>({formattedDate})</span>
            </h3>
            <p>{review.review}</p> 
            <div className="star-rating">
                {Array.from({ length: review.stars }, (_, index) => (
                    <span key={index} className="star-icon filled">★</span> 
                ))}
                {Array.from({ length: 5 - review.stars }, (_, index) => (
                    <span key={index + review.stars} className="star-icon empty">☆</span> 
                ))}
            </div>
        </div>
    );
};

export default Review;