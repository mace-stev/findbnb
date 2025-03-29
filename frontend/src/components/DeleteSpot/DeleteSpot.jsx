import './DeleteSpot.css'
import { useDispatch } from 'react-redux';
import { deleteSpot, getUsersSpots } from '../../store/spotsStore';
import { useModal } from '../../context/Modal';


function DeleteSpot({spotId}){
const dispatch = useDispatch()

const { closeModal } = useModal();
function deleteSpotById(id){
    dispatch(deleteSpot(id))
    dispatch(getUsersSpots())
     closeModal()
}
    return(<>
    
      <h1 className="delete-spot-title">Confirm Delete</h1>
      <h2>Are you sure you want to remove the spot from the listings?</h2>
    
          <button className="delete-button" type="button" onClick={()=>{deleteSpotById(spotId)}}>Yes (Delete Spot)</button>
          <button type="button" className="keep-button"onClick={closeModal}>No (Keep Spot)</button>
     
    </>)
}
export default DeleteSpot;