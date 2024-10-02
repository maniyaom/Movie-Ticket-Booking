import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import './Navbar.css';

export default function Navbar() {
    const firebase = useFirebase();  
    const auth = getAuth(); 
    const detailsRef = useRef(null); // Create a reference to the <details> element

    // Function to close the dropdown when an item is clicked
    const handleDropdownClose = () => {
      if (detailsRef.current) {
        detailsRef.current.removeAttribute('open'); // Close the <details> element
      }
    };
    const handleClickOutside = (event) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        handleDropdownClose();
      }
    };
    
    useEffect(() => {
      // Add event listener to detect clicks outside the dropdown
      document.addEventListener('click', handleClickOutside);
      return () => {
        // Cleanup event listener when component unmounts
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); 
    const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
    
    useEffect(() => {
        const getUserData = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                try {
                    const userDetails = await firebase.fetchUserDetails(uid);
                    setName(userDetails.name);
                    setEmail(userDetails.email);
                    setIsLoggedIn(true);
                    setIsAdmin(userDetails.isAdmin);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
            else{
                setIsLoggedIn(false);
            }
        });
    
        return () => getUserData();
    }, [auth]);

    const handleLogout = () => {
        signOut(auth);
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    return (
        <>
            <nav className="nav">
                <a href="/" className="logo">Ticketify</a>


                <div className={`nav-menu  ${menuOpen ? 'active' : ''}`}>
                    {/* Hamburger Icon */}
                    <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/AboutUs">About Us</Link></li>
                        <li><Link to="/ContactUs">Contact Us</Link></li>
                        <li className={isLoggedIn ? 'hide-div' : ''}><Link to="/Login">Login</Link></li>
                        <li className={isAdmin ? '' : 'hide-div'}><Link to="/AddMovie">List Your Show</Link></li>
                    </ul>

                    

                    <div className={isLoggedIn ? 'dropdown-container' : 'hide-div'}>
                                            <details className="dropdown right">
                
             <ul className="nav-links">
      <li>
        <NavLink
          exact
          to="/"
          className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/AboutUs"
          className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/ContactUs"
          className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
        >
          Contact Us
        </NavLink>
      </li>
      {!isLoggedIn && (
        <li>
          <NavLink
            to="/Login"
            className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
          >
            Login
          </NavLink>
        </li>
      )}
      {isAdmin && (
        <li>
          <NavLink
            to="/AddMovie"
            className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
          >
            List Your Show
          </NavLink>
        </li>
      )}
    </ul>

                <div className={isLoggedIn ? 'dropdown-container' : 'hide-div'}>
                    <details className="dropdown right" ref={detailsRef}>

                        <summary className="avatar">
                            <img src="https://gravatar.com/avatar/00000000000000000000000000000000?d=mp" alt="Avatar" />
                        </summary>
                        <ul>
                            <li>
                                <p>
                                    <span className="block bold">{name}</span>
                                    <span className="block italic">{email}</span>
                                </p>
                            </li>

                            <li>
                                <Link to={'/Account'} onClick={handleDropdownClose}>
                                    <span className="material-symbols-outlined">account_circle</span> Account
                                </Link>
                            </li>
                            <li>
                                <Link to={'/ContactUs'} onClick={handleDropdownClose}>
                                    <span className="material-symbols-outlined">help</span> Help
                                </Link>
                            </li>
                            
                            <li className="divider"></li>
                            <li>
                                <a onClick={() => { handleLogout(); handleDropdownClose(); }}>
                                    <span className="material-symbols-outlined">logout</span> Logout
                                </a>
                            </li>
                        </ul>
                    </details>
                    </div>
                </div>

                
            </nav>
        </>
    );
}
