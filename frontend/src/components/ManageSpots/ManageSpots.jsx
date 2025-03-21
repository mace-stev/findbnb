import './ManageSpots.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersSpots } from '../../store/spotsStore'
import { FaImage } from 'react-icons/fa';
import { FaStar } from "react-icons/fa"
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpot from '../DeleteSpot';



function ManageSpots() {
    const spots = useSelector(state => state.spots)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsersSpots())
        console.log("hi")

    }, [dispatch])

    const allSpots = spots?.byId ? Object.values(spots.byId) : [];
    return (<>
        <h1>Manage Your Spots</h1>
        <NavLink to="/spots/new">Create a New Spot</NavLink>
        {Object.values(allSpots)?.map((element) => {
            if (element?.previewImage) {
                return <>
                    <NavLink className="spot" key={element?.id} to={`/${element?.id}`}>
                        <div>
                            <img className="spotImages" src={element?.previewImage} />
                        </div>
                        <div className="spotImages-caption-div" >
                            <h3>{`${element?.city}, ${element?.state}`}</h3>
                            <div className='spotImages-rating-div'>
                                <FaStar className='rating-star' />
                                <h3>{element?.avgRating?.toFixed(1)}</h3>
                            </div>
                        </div>
                        <div>

                            <p>
                                {<span className="spot-price-span">{`$${element?.price}`}</span>} night
                            </p>
                        </div>
                        </NavLink>
                        <NavLink to={`/spots/${element.id}/edit`}>Update</NavLink>
                        <OpenModalMenuItem
                            itemText="Delete"
                            modalComponent={<DeleteSpot spotId={element.id} />}
                        />
                </>
            }
            return <>
                <NavLink className="spot" key={element?.id} to={`/${element?.id}`}>
                    <div>
                        <FaImage className='spotImages' />
                    </div>
                    <div className="spotImages-caption-div" >
                        <h3>{`${element?.city}, ${element?.state}`}</h3>
                        <div className='spotImages-rating-div'>
                            <FaStar className='rating-star' />
                            <h3>{element?.avgRating?.toFixed(1)}</h3>
                        </div>
                    </div>
                    <div>
                        <p>
                            {<span className="spot-price-span">{`$${element?.price}`}</span>} night
                        </p>
                    </div>
                    </NavLink>
                    <NavLink to={`/spots/${element.id}/edit`}>Update</NavLink>
                    <OpenModalMenuItem
                        itemText="Delete"
                        onItemClick={()=>{
                            return(<div className="menu-overlay"></div>)
                        }}
                        modalComponent={<DeleteSpot spotId={element.id} />}
                    />
            </>

        })}
    </>)
}
export default ManageSpots;