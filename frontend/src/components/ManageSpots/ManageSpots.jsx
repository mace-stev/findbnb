import './ManageSpots.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersSpots } from '../../store/spotsStore'
import { FaImage } from 'react-icons/fa';
import { FaStar } from "react-icons/fa"
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpot from '../DeleteSpot';
import React from 'react';



function ManageSpots() {
    const spots = useSelector(state => state.spots)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsersSpots())

    }, [dispatch])

    const allSpots = spots?.byId ? Object.values(spots.byId) : [];
    return (<section className="body-section">
        <div className="header-container">
        <h1 className="manage-spots-title">Manage Your Spots</h1>
        <button className="spot-button"><NavLink className="spots-navlink" to="/spots/new">Create a New Spot</NavLink></button>
        </div>
        <div className="manage-spots-container">
        {Object.values(allSpots)?.map((element) => {
            if (element?.previewImage) {
                return < div className="spot-container" key={element.id}>
                    <NavLink className="spot"  to={`/${element?.id}`}>
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
                        <div className="button-container">
                        <button className="spot-button">
                        <NavLink to={`/spots/${element.id}/edit`} className="spots-navlink">Update</NavLink>
                        </button>
                        <button className="spot-button">
                        <OpenModalMenuItem
                        itemText="Delete"
                        onItemClick={()=>{
                            return(<div className="menu-overlay"></div>)
                        }}
                        modalComponent={<DeleteSpot spotId={element.id} />}
                        
                    />
                    </button>
                        </div>
               </div>
            }
            return  < div className="spot-container"key={element.id}>
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
                    <div className="button-container">
                        <button className="spot-button">
                        <NavLink to={`/spots/${element.id}/edit`} className="spots-navlink">Update</NavLink>
                        </button>
                        <button className="spot-button">
                        <OpenModalMenuItem
                        itemText="Delete"
                        onItemClick={()=>{
                            return(<div className="menu-overlay"></div>)
                        }}
                        modalComponent={<DeleteSpot spotId={element.id} />}
                       
                    />
                    </button>
                        </div>
             </div>

        })}
        </div>
    </section>)
}
export default ManageSpots;