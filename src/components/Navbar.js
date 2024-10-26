import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import useThemeSwitcher from './useThemeSwitcher';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {  FiMoon, FiSun } from 'react-icons/fi';
import './Navbar.css';
import GoogleTranslate from './GoogleTranslate';
export default function Navbar() {
    const firebase = useFirebase();  
    const auth = getAuth(); 
    const detailsRef = useRef(null); 

    
	const [activeTheme, setTheme] = useThemeSwitcher();

    // Function to close the dropdown when an item is clicked
    const handleDropdownClose = () => {
      if (detailsRef.current) {
        detailsRef.current.removeAttribute('open');
      }
    };

    const handleClickOutside = (event) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        handleDropdownClose();
      }
    };

    useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); 
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUserData = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                setUserId(uid);
                try {
                    const userDetails = await firebase.fetchUserDetails(uid);
                    setName(userDetails.name);
                    setEmail(userDetails.email);
                    setIsLoggedIn(true);
                    
                    if(userDetails.isAdmin == false)
                        setIsAdmin(false);
                    else
                        setIsAdmin(true);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
            else{
                setIsLoggedIn(false);
                setUserId(null);
            }
        });
    
        return () => getUserData();
    }, [auth]);

    const handleLogout = () => {
        signOut(auth);
    };

    

    return (
        <>
            {/* <link rel="stylesheet" href="Navbar.css" /> */}
            <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css" />
            <script src="NavbarScript.js" defer></script>

            <nav className="nav">
                <a href="/" className="logo">Ticketify</a>


                <ul className="nav-links ">
                    <li >
                      <NavLink
                        exact
                        to="/"
                        className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                      >
                        Home
                      </NavLink>
                    </li>
                    {isLoggedIn &&
                      <li>
                        <NavLink
                          to={`/MyTickets/${userId}`}
                          className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                        >
                          My Tickets
                        </NavLink>
                      </li>
                    }
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
                      <>
                      <li>
                        <NavLink
                          to="/AddMovie"
                          className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                        >
                          List Your Show
                        </NavLink>
                      </li>

                      <li>
                      <NavLink
                        to="/Verify"
                        className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                      >
                        Verify
                      </NavLink>
                      </li>
                      </>
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

                <div onClick={() => setTheme(activeTheme)}
                              aria-label="Theme Switcher"
                              className="ml-2 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
                            >
                    {activeTheme === 'light' ? (
                      <FiMoon className="text-ternary-dark hover:text-gray-200 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
                    ) : (
                      <FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
                    )}
                  </div>
                  <GoogleTranslate />
            </nav>
        </>
    )
}
