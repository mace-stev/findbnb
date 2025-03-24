// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FaAirbnb } from 'react-icons/fa';

function Navigation() {
  const sessionUser = useSelector(state => state.session);
  return (
    <ul className="navbar">
      <li className="logo-div">
        <NavLink to="/"className="home-link"><FaAirbnb className="logo"/> FindBnb</NavLink>
      </li>
      <div className="profile-dropdown-div">
        {typeof(sessionUser?.allIds?.[0]) === 'number' && (
          <li className="create-a-spot-list-item">
            <NavLink to="/spots/new" className="create-a-spot">Create a New Spot</NavLink>
          </li>
        )}
        <li className="profile-dropdown-list-item">
          <ProfileButton user={sessionUser} />
        </li>
      </div>
    </ul>
  );
}

export default Navigation;