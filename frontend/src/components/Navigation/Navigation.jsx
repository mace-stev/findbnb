// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FaAirbnb } from 'react-icons/fa';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className="navbar">
      <li>
        <NavLink to="/"><FaAirbnb/> FindBnb</NavLink>
      </li>
      
        <li>
          <ProfileButton user={sessionUser} />
        </li>
    
    </ul>
  );
}

export default Navigation;