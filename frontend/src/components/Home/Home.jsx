import './Home.css'
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { fetchSpots } from '../../store/spotsStore'
function Home(){
const spots=useSelector(state=> state.spots)
const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchSpots())
        

    },[dispatch])
    return(<></>)
}
export default Home;