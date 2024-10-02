import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import loader_icon from "../assets/icons/loader_icon.gif";
import "./utils.css";
import "./AboutUs.css";
import "./ContactUs.css";
import Footer from "../components/Footer";

const ContactUs = () => {
  return (
    <>
      <div className="flex justify-center">
        <div>
          <h1
            style={{
              color: "#f84464",
              textAlign: "center",
              marginTop: "30px",
              fontSize: "43px",
            }}
          >
            Contact US
          </h1>
          <p
            style={{ opacity: "0.8", fontWeight: "600" }}
            className="Contact_Us_Text text-center"
          >
            Thank you for choosing Ticketify! We're here to assist you with any
            questions or concerns you may have. Here's how you can get in touch
            with us:
          </p>

          <div className="card-image-div flex-col">
            <h2 className="title">Customer Support:</h2>
            <ul style={{ marginLeft: "2rem" }}>
              <li>
                For assistance with your bookings, refunds, or any other
                inquiries, please reach out to our Customer Support team.
              </li>
              <ul style={{ marginLeft: "2rem", marginTop: "1rem" }}>
                <li>
                  <b>Email: </b>support@ticketify.com
                </li>
                <li>
                  <b>Phone: </b>1-800-MOVIE-TIX (1-800-668-4384)
                </li>
                <li>
                  <b>Live Chat: </b>Available on our website during business
                  hours
                </li>
              </ul>
            </ul>
          </div>

          <div className="card-image-div flex-col">
            <h2 className="title">Business Inquiries:</h2>
            <ul style={{ marginLeft: "2rem" }}>
              <li>
                Interested in partnership opportunities or have a business
                proposal? Contact our Business Development team.
              </li>
              <ul style={{ marginLeft: "2rem", marginTop: "1rem" }}>
                <li>
                  <b>Email: </b>partnership@ticketify.com
                </li>
                <li>
                  <b>Phone: </b>1-888-555-PART (1-888-555-7278)
                </li>
              </ul>
            </ul>
          </div>

          <div className="card-image-div flex-col">
            <ul style={{ marginLeft: "2rem" }}>
              <li>
                We value your feedback and suggestions. Let us know how we can
                improve your experience.
              </li>
              <ul
                style={{
                  marginLeft: "2rem",
                  marginTop: "1rem",
                  marginBottom: "2rem",
                }}
              >
                <li>
                  <b>Email: </b>feedback@yourmovietickets.com
                </li>
              </ul>
            </ul>

            <h2 className="title" style={{ fontSize: "22px", fontWeight: 500 }}>
              Address
            </h2>
            <p
              style={{
                marginLeft: "2rem",
                fontWeight: 600,
                opacity: 0.8,
                marginBottom: "1rem",
              }}
            >
              Ticketify private limited, 123 Movie Ave, Surat, Gujarat, 394107,
              India
            </p>
          </div>
          <p
            className="card-image-div flex-col"
            style={{ backgroundColor: "#fdcad3", fontWeight: 600 }}
          >
            Feel free to reach out to us through any of the above channels. We
            strive to respond to all inquiries within 24 hours during business
            days. Thank you for choosing Ticketify!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
