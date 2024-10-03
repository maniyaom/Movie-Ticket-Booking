import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import facebook_icon from '../assets/icons/facebook2.png'
import instagram_icon from '../assets/icons/instagram2.png'
import linkedin_icon from '../assets/icons/linkedin2.png'
import twitter_icon from '../assets/icons/twitter.png'

export default function Footer() {
    return (
        <>
            <footer>
                <div className="footer-container">
                    <div className="footer-left">
                        <div>
                            <span>Follow Us</span>
                            <a href='https://facebook.com'><img src={facebook_icon} alt="Facebook" className="social-icon" /></a>
                            <a href='https://instagram.com'><img src={instagram_icon} alt="Instagram" className="social-icon" /></a>
                            <a href='https://linkedin.com'><img src={linkedin_icon} alt="LinkedIn" className="social-icon" /></a>
                            <a href='https://x.com'><img src={twitter_icon} alt="Twitter" className="social-icon" /></a>
                        </div>
                        <div className='footer-links'>
                            <Link to="/">Home</Link>
                            <Link to="/AboutUs">About Us</Link>
                            <Link to="/ContactUs">Contact Us</Link>
                            <Link to="/Login">Login</Link>
                        </div>
                    </div>

                    <div className="footer-right">
                        <div>About Ticketify</div>
                        <p>
                            At Ticketify, we are a team of dedicated movie enthusiasts and tech experts with a shared vision: to revolutionize the way you book movie tickets. Founded in 2024, our mission is to make movie ticket booking seamless, fast, and enjoyable for everyone.
                        </p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>Copyright © 2024 Ticketify. All rights reserved.</span>
                </div>
            </footer>
        </>
    )
}