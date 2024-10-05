import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import './Navbar.css';

export default function Navbar() {
    const firebase = useFirebase();  
    const auth = getAuth(); 

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); 
    
    useEffect(() => {
        const getUserData = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
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
            }
        });
    
        return () => getUserData();
    }, [auth]);

    const handleLogout = () => {
        signOut(auth)
    }

    return (
        <>
            <link rel="stylesheet" href="Navbar.css" />
            <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css" />
            <script src="NavbarScript.js" defer></script>

            <nav className="nav">
                <Link to={isLoggedIn ? '/' :'/herosection'} className="logo">Ticketify</Link>

                <ul className="nav-links">
                    <li><Link to={isLoggedIn ? '/':'/herosection'}>Home</Link></li>
                    <li><Link to="/AboutUs">About Us</Link></li>
                    <li><Link to="/ContactUs">Contact Us</Link></li>
                    <li className={isLoggedIn ? 'hide-div' : ''}><Link to="/Login">Login</Link></li>
                    <li className={isAdmin ? '' : 'hide-div'}><Link to="/AddMovie">List Your Show</Link></li>
                </ul>

                <div className={isLoggedIn ? 'dropdown-container' : 'hide-div'}>
                    <details className="dropdown right">
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
                                <Link to={'/Account'}>
                                    <span className="material-symbols-outlined">account_circle</span> Account
                                </Link>
                            </li>
                            <li>
                                <Link to={'/ContactUs'}>
                                    <span className="material-symbols-outlined">help</span> Help
                                </Link>
                            </li>
                            
                            <li className="divider"></li>
                            <li>
                                <a onClick={handleLogout}>
                                    <span className="material-symbols-outlined">logout</span> Logout
                                </a>
                            </li>
                        </ul>
                    </details>
                </div>
            </nav>
        </>
    )
}