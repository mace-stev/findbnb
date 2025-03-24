import "./NewReview.css"
import { useModal } from '../../context/Modal';
import { FaStar } from "react-icons/fa"
import { useState } from "react";
import { addReview } from "../../store/reviewsStore";
import { useDispatch } from "react-redux";
import { fetchSpotReviews } from "../../store/reviewsStore";
function NewReview({spotId}) {
    const { closeModal } = useModal();
    const [star1, setStar1] =useState({ fill: 'white', stroke: 'black', strokeWidth: 75 })
    const [star2, setStar2] =useState({ fill: 'white', stroke: 'black', strokeWidth: 75 })
    const [star3, setStar3] =useState({ fill: 'white', stroke: 'black', strokeWidth: 75 })
    const [star4, setStar4] =useState({ fill: 'white', stroke: 'black', strokeWidth: 75 })
    const [star5, setStar5] =useState({ fill: 'white', stroke: 'black', strokeWidth: 75 })
    const starArray=[setStar1,setStar2, setStar3, setStar4, setStar5]
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const dispatch = useDispatch()
    function onSubmit(e){
        e.preventDefault()
        console.log(spotId)
        dispatch(addReview({
            spotId: spotId,
            review: review,
            stars: rating
        }))
        dispatch(fetchSpotReviews(spotId))
        closeModal()
        
    }
    return (<>
        <form onSubmit={(e)=>{onSubmit(e)}}>
            <h1>How was your stay?</h1>
            <textarea name="review" onChange={(e)=>{setReview(e.target.value)}}></textarea>
            <div className="rating-container">
                <div className="star-container">
                <FaStar style={star1}  onClick={()=>{
                    for(let i=0;i<1;i++){
                        if(star1.fill!=='black')
                            starArray[i]({fill: "black"})
                            if(star1.fill==='black'){
                                starArray[i]({ fill: 'white', stroke: 'black', strokeWidth: 75 })
                            }
                    }
                    setRating(1)
                }}/>
                <FaStar style={star2}  onClick={()=>{
                    for(let i=0;i<2;i++){
                        if(star2.fill!=='black')
                            starArray[i]({fill: "black"})
                            if(star2.fill==='black'){
                                starArray[i]({ fill: 'white', stroke: 'black', strokeWidth: 75 })
                            }
                    }
                    setRating(2)
                }}/>
                <FaStar style={star3}  onClick={()=>{
                    for(let i=0;i<3;i++){
                        if(star3.fill!=='black')
                            starArray[i]({fill: "black"})
                            if(star3.fill==='black'){
                                starArray[i]({ fill: 'white', stroke: 'black', strokeWidth: 75 })
                            }
                    }
                    setRating(3)
                }}/>
                <FaStar style={star4}  onClick={()=>{
                    for(let i=0;i<4;i++){
                        if(star4.fill!=='black')
                        starArray[i]({fill: "black"})
                        if(star4.fill==='black'){
                            starArray[i]({ fill: 'white', stroke: 'black', strokeWidth: 75 })
                        }
                    }
                    setRating(4)
                }} />
                <FaStar style={star5} onClick={()=>{
                    for(let i=0;i<5;i++){
                        if(star5.fill!=='black')
                            starArray[i]({fill: "black"})
                            if(star5.fill==='black'){
                                starArray[i]({ fill: 'white', stroke: 'black', strokeWidth: 75 })
                            }
                    }
                    setRating(5)
                }}/>
                </div><h3>{rating} Stars</h3></div>
                <input className="rating-input" name="rating" defaultValue={rating}></input>
            <button className="review-button" type="submit" >Submit Your Review</button>
        </form>

    </>)
}
export default NewReview