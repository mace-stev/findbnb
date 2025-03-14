import './Home.css'
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { fetchSpots } from '../../store/spotsStore'
import { FaImage } from 'react-icons/fa';
import {FaStar} from "react-icons/fa"
import { NavLink } from 'react-router-dom';
function Home() {
    const spots = useSelector(state => state.spots)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchSpots())

       
    }, [dispatch])
    const allSpots = spots?.byId ? Object.values(spots.byId) : [];
    console.log(spots)
    return (<section>
        {Object.values(allSpots)?.map((element) => {
            if(element.previewImage){
            return <>
                <NavLink className="spot" key={element.id} to="/:id">
                    <div>
                        <img className="spotImages" src={element.previewImage} />
                    </div>
                    <div className="spotImages-caption-div" >
                        <h3>{`${element.city}, ${element.state}`}</h3>
                        <div className='spotImages-rating-div'>
                        <FaStar className='rating-star'/> 
                        <h3>{element.avgRating.toFixed(1)}</h3>
                        </div>
                    </div>
                    <div>
                    
                        <p>
                            {<span className="spot-price-span">{`$${element.price}`}</span>} night
                        </p>
                    </div>
                </NavLink>
            </>
            }
            return <>
                <NavLink className="spot" key={element.id} to={`/${element.id}`}>
                    <div>
                        <FaImage className='spotImages'/>
                    </div>
                    <div className="spotImages-caption-div" >
                        <h3>{`${element.city}, ${element.state}`}</h3>
                        <div className='spotImages-rating-div'>
                        <FaStar className='rating-star'/> 
                        <h3>{element.avgRating}</h3>
                        </div>
                    </div>
                    <div>
                        <p>
                            {<span className="spot-price-span">{`$${element.price}`}</span>} night
                        </p>
                    </div>
                </NavLink>
            </>

        })}
    </section>)
}
export default Home;