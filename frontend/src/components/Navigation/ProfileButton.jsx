import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal/index";
import SignupFormModal from "../SignUpFormModal/index";
import { NavLink } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevents bubbling up
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const oneUser = user?.byId ? Object.values(user?.byId) : [];
  const currUser = Object.values(oneUser)[0];

  return (
    <>
      <button onClick={toggleMenu} className="toggle-button">
        <FaUserCircle />
      </button>

      
      {showMenu && <div className="menu-overlay" onClick={closeMenu}></div>}

      
      {showMenu && (
        <ul className={ulClassName} ref={ulRef}>
          {typeof user?.allIds?.[0] === "number" ? (
            <>
              <li className="profile-dropdown-li">{`Hello ${currUser?.username}`}</li>
              <li className="profile-dropdown-li">{currUser?.email}</li>
              <li className="profile-dropdown-manage-spots-li"><NavLink className="manage-spots-nav" to="/spots/current">Manage Spots</NavLink></li>
              <li className="profile-dropdown-li">
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
