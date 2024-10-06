import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import loader_icon from "../assets/icons/loader_icon.gif";
import "./utils.css";
import "./ContactUs.css";
import Footer from '../components/Footer';
import bg from '../assets/images/brown.webp';

const ContactUs = () => {
  return (
    <div className="contact" style={{ backgroundImage: `url(${bg})` }}>
      <div className="heading">
        <h1>Contact Us</h1>
        <p>Thank you for choosing Ticketify! We're here to assist you with any
          questions or concerns you may have. Here's how you can get in touch
          with us</p>
      </div>
      <div className="infos">
        <div className="customer">
          <h2>Customer Support</h2>
          <p>For assistance with your bookings, refunds, or any other
            inquiries, please reach out to our Customer Support team</p>
          <p><b>Email: </b>support@ticketify.com</p>
          <p><b>Phone: </b>1-800-MOVIE-TIX (1-800-668-4384)</p>
        </div>
        <div className="business">
          <h2>Business enquiries</h2>
          <p>Interested in partnership opportunities or have a business
            proposal? Contact our Business Development team</p>
          <p><b>Email: </b>partnership@ticketify.com</p>
          <p><b>Phone: </b>1-888-555-PART (1-888-555-7278)</p>
        </div>
      </div>
      <div className="feedback">
        <div className="para">
          <p>We value your feedback and suggestions. Let us know how we can
            improve your experience.</p>
          <p><b>Email: </b>feedback@yourmovietickets.com</p>
        </div>
        <h3>Address</h3>
        <p>Ticketify private limited, 123 Movie Ave, Surat, Gujarat, 394107,
              India</p>
        <p>Feel free to reach out to us through any of the beside channels. We
              strive to respond to all inquiries within 24 hours during business
              days. Thank you for choosing Ticketify!</p>
      </div>
      <Footer/>
    </div>
  );
};

export default ContactUs;