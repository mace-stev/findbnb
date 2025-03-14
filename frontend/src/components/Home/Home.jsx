import './Home.css'
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { fetchSpots } from '../../store/spotsStore'
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
            return <>
                <div className="spot">
                    <div>
                        <img className="spotImages" src={element.previewImage} />
                    </div>
                    <div className="spotImages-caption-div">
                        <h3>{`${element.city}, ${element.state}`}</h3>
                        <h3>{element.avgRating}</h3>
                    </div>
                    <div>
                        <p>
                            {<span className="spot-price-span">{`$${element.price}`}</span>} night
                        </p>
                    </div>
                </div>
            </>
        })}
    </section>)
}
export default Home;