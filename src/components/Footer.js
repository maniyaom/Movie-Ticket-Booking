import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import facebook_icon from '../assets/icons/facebook2.png'
import instagram_icon from '../assets/icons/instagram2.png'
import linkedin_icon from '../assets/icons/linkedin2.png'
import twitter_icon from '../assets/icons/twitter.png'

export default function Footer() {
    return (
        <>
            <footer>
                <div className="bg-[#f84464] w-screen flex justify-between pb-5 flex-wrap  max-md:flex-col max-md:items-center max-md:text-center max-md:py-5">
                    <div className="w-1/2 p-5 max-md:w-full max-md:p-2.5">
                        <div className='flex items-center mb-5 flex-wrap max-md:justify-center'>
                            <span className='text-white text-2xl font-bold mr-2.5 max-md:text-2xl'>Follow Us</span>
                            <a className="text-white no-underline mr-3 font-medium transform hover:scale-125 transition-transform duration-[380ms] ease-in-out" href='https://facebook.com'><img src={facebook_icon} alt="Facebook" className="social-icon w-8 h-8 ml-2 max-md:w-[30px] max-md:h-[30px] max-md:ml-[5px]" /></a>
                            <a className="text-white no-underline mr-3 font-medium transform hover:scale-125 transition-transform duration-[380ms] ease-in-out" href='https://instagram.com'><img src={instagram_icon} alt="Instagram" className="social-icon w-8 h-8 ml-2 max-md:w-[30px] max-md:h-[30px] max-md:ml-[5px]" /></a>
                            <a className="text-white no-underline mr-3 font-medium transform hover:scale-125 transition-transform duration-[380ms] ease-in-out" href='https://linkedin.com'><img src={linkedin_icon} alt="LinkedIn" className="social-icon w-8 h-8 ml-2 max-md:w-[30px] max-md:h-[30px] max-md:ml-[5px]" /></a>
                            <a className="text-white no-underline mr-3 font-medium transform hover:scale-125 transition-transform duration-[380ms] ease-in-out" href='https://x.com'><img src={twitter_icon} alt="Twitter" className="social-icon w-8 h-8 ml-2 max-md:w-[30px] max-md:h-[30px] max-md:ml-[5px]" /></a>
                        </div>
                        <div className='footer-links flex justify-start max-md:justify-center'>
                            <Link className='mr-3 text-white transform transition-transform duration-[380ms] ease-in-out hover:text-opacity-80 hover:scale-125 ' to="/">Home</Link>
                            <Link className='mr-3 text-white transform transition-transform duration-[380ms] ease-in-out hover:text-opacity-80 hover:scale-125 '  to="/AboutUs">About Us</Link>
                            <Link className='mr-3 text-white transform transition-transform duration-[380ms] ease-in-out hover:text-opacity-80 hover:scale-125 '  to="/ContactUs">Contact Us</Link>
                            <Link className='mr-3 text-white transform transition-transform duration-[380ms] ease-in-out hover:text-opacity-80 hover:scale-125 '  to="/Login">Login</Link>
                        </div>
                    </div>

                    <div className="footer-right w-1/2 p-5 max-md:w-full max-md:p-2.5">
                        <div className='flex items-center justify-center mb-4 text-white text-2xl font-bold mr-2.5 max-md:text-2xl' >About Ticketify</div>
                        <p className='text-white mr-[150px] text-base  max-md:mb-5 max-md:mr-0'>
                            At Ticketify, we are a team of dedicated movie enthusiasts and tech experts with a shared vision: to revolutionize the way you book movie tickets. Founded in 2024, our mission is to make movie ticket booking seamless, fast, and enjoyable for everyone.
                        </p>
                    </div>
                </div>
                <div className="bg-[#f84464] w-screen flex justify-around pb-5 flex-wrap text-white">
                    <span>Copyright © 2024 Ticketify. All rights reserved.</span>
                </div>
            </footer>
        </>
    )
}