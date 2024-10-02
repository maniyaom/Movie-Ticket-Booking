import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBell } from "@fortawesome/free-solid-svg-icons";

import './Navbar.css';

export default function Navbar() {
    const firebase = useFirebase();  
    const auth = getAuth(); 
    const navigate = useNavigate();
    const detailsRef = useRef(null);

    // Function to close the dropdown
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

    const handleNotificationClick = () => {
        console.log('Notification icon clicked!'); 
        navigate('/notifications');
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
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                try {
                    const userDetails = await firebase.fetchUserDetails(uid);
                    setName(userDetails.name);
                    setEmail(userDetails.email);
                    setIsLoggedIn(true);
                    setIsAdmin(userDetails.isAdmin === true);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe(); // Proper cleanup
    }, [auth]);

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <>
            <nav className="nav">
                <a href="/" className="logo">Ticketify</a>
                <ul className="nav-links">
                    <li>
                        <NavLink
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
                <span className="notification-icon" onClick={handleNotificationClick}>
                <FontAwesomeIcon icon={faBell} className="text-Black-700 text-lg" />
                </span>
            </nav>
        </>
    );
}
