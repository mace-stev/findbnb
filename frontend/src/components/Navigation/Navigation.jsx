import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import NavIcon from '../NavIcon'; // Import NavIcon component
import './Navigation.css';
import logo from '../../images/logo.png';
import { FaArrowLeft, FaArrowRight, FaHome, FaSearch, FaTimes } from 'react-icons/fa'; // Importing required icons
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const location = useLocation(); 
    const navigate = useNavigate(); 

    const isLandingPage = location.pathname === '/';
    

    const [searchQuery, setSearchQuery] = useState('');

    const handleIconClick = (iconType) => {
        switch (iconType) {
            case 'search':
                // Implement the search functionality
                if (searchQuery.trim()) {
                    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                } else {
                    console.log('Please enter a search query');
                }
                break;
            case 'home':
                navigate('/'); 
                break;
            case 'arrowLeft':
                window.history.back(); 
                break;
            case 'arrowRight':
                window.history.forward(); 
                break;
            case 'close':
                console.log('Close clicked'); 
                break;
            default:
                break;
        }
    };

    return (
        <nav className="navbarContainer">
            {/* Render top navigation only if not on the landing page */}
            {!isLandingPage && (
                <div className="navbar_top">
                    <div className="navigation_controls">
                        <NavIcon Icon={FaArrowLeft} onClick={() => handleIconClick('arrowLeft')} className="nav_icon" />
                        <NavIcon Icon={FaArrowRight} onClick={() => handleIconClick('arrowRight')} className="nav_icon" />
                        <NavIcon Icon={FaTimes} onClick={() => handleIconClick('close')} className="nav_icon" />
                        <NavIcon Icon={FaHome} onClick={() => handleIconClick('home')} className="nav_icon" />
                        
                        {/* Search Input */}
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            className="search_input"
                        />
                        <NavIcon Icon={FaSearch} onClick={() => handleIconClick('search')} className="search_icon" />
                    </div>
                </div>
            )}
            <div className="navbar_logo">
                <NavLink to="/">
                    <img src={logo} alt="logo" className="logo" />
                </NavLink>
            </div>
            <div className="navbar_right">
                {isLoaded && <ProfileButton user={sessionUser} />}
            </div>
        </nav>
    );
}

export default Navigation;