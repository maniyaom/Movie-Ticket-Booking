import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "../Components/Navbar";
import loader_icon from "../assets/icons/loader_icon.gif";

const ContactUs = () => {

  const firebase = useFirebase();
  const auth = getAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserData = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            try {
                const userDetails = await firebase.fetchUserDetails(uid);
                setName(userDetails.name);
                setEmail(userDetails.email);
                console.log(userDetails);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }
    });

    return () => getUserData();
}, [auth]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center align-center" style={{ marginTop: '30px' }}>
        <div className="signup-card">
          <div className="signup-heading text-center myb-20">Contact Us</div>
          <div className="signup-subheading myb-20">
            Please provide your name, email address, and Issue.
          </div>

          <label htmlFor="username" className="label-text">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            placeholder="e.g. John Doe"
          />

          <label htmlFor="email" className="label-text">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="e.g. example@gmail.com"
          />

          <label htmlFor="query" className="label-text">
            Query
          </label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-text-area"
            rows={6}
            placeholder="Enter your query"
          />

          {/* <div className={isLoading ? 'show-loader' : 'loader-icon-div'}>
            <img src={loader_icon} alt="Loader Icon" />
          </div> */}

          <span className="error">{error}</span>

          <button className="btn">Submit</button>
          <div className="terms-condition">
            By clicking the button, you are agreeing to our Terms and Services
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;