// src/components/Navbar.js
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import './Navbar.css';

export default function Navbar() {
  const firebase = useFirebase();  
  const auth = getAuth(); 
  const detailsRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  
  useEffect(() => {
    const getUserData = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setIsLoggedIn(true);
        try {
          const userDetails = await firebase.fetchUserDetails(uid);
          setName(userDetails.name);
          setEmail(userDetails.email);
          setIsAdmin(userDetails.isAdmin || false);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => getUserData();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className="nav">
      <a href="/" className="logo">Ticketify</a>
      <ul className="nav-links">
        <li><NavLink exact to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink></li>
        <li><NavLink to="/AboutUs" className={({ isActive }) => isActive ? 'active-link' : ''}>About Us</NavLink></li>
        <li><NavLink to="/ContactUs" className={({ isActive }) => isActive ? 'active-link' : ''}>Contact Us</NavLink></li>
        <li><NavLink to="/Offers" className={({ isActive }) => isActive ? 'active-link' : ''}>Offers</NavLink></li> {/* Link to Offers */}
        {!isLoggedIn && <li><NavLink to="/Login" className={({ isActive }) => isActive ? 'active-link' : ''}>Login</NavLink></li>}
        {isAdmin && <li><NavLink to="/AddMovie" className={({ isActive }) => isActive ? 'active-link' : ''}>List Your Show</NavLink></li>}
      </ul>
      <div className={isLoggedIn ? 'dropdown-container' : 'hide-div'}>
        <details className="dropdown right" ref={detailsRef}>
          <summary className="avatar">
            <img src="https://gravatar.com/avatar/00000000000000000000000000000000?d=mp" alt="Avatar" />
          </summary>
          <ul>
            <li><p><span className="block bold">{name}</span><span className="block italic">{email}</span></p></li>
            <li><Link to='/Account' onClick={() => detailsRef.current.removeAttribute('open')}>Account</Link></li>
            <li><Link to='/ContactUs' onClick={() => detailsRef.current.removeAttribute('open')}>Help</Link></li>
            <li className="divider"></li>
            <li><a href="#" onClick={handleLogout}>Logout</a></li>
          </ul>
        </details>
      </div>
    </nav>
  );
}
