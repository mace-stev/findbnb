import './DeleteReview.css'
import { useDispatch } from 'react-redux';
import { deleteReview, fetchSpotReviews} from '../../store/reviewsStore';
import { useModal } from '../../context/Modal';
function DeleteReview({reviewId, spotId}){
    const dispatch = useDispatch()
    
    const { closeModal } = useModal();
    function deleteReviewById(id){
        dispatch(deleteReview(id))
        dispatch(fetchSpotReviews(spotId))
         closeModal()
    }
        return(<>
        
          <h1>Confirm Delete</h1>
          <h2>Are you sure you want to delete this review?</h2>
        
              <button type="button" className="delete-button"onClick={()=>{deleteReviewById(reviewId)}}>Yes (Delete Review)</button>
              <button type="button"onClick={closeModal}>No (Keep Review)</button>
         
        </>)
}
export default DeleteReview;