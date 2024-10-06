import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/firebase";
import loader_icon from "../assets/icons/loader_icon.gif";
import { Link, useNavigate } from 'react-router-dom'
import { getAuth,GoogleAuthProvider,signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import './utils.css'
import '../components/Navbar.css';
import movie from '../assets/images/Movie-Ticket-Booking-1024x768.png';

const SignUp = () => {

  const navigate = useNavigate();
  const firebase = useFirebase();
  const auth = getAuth();
  const provider = new GoogleAuthProvider(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [theaterName, setTheaterName] = useState("");
  const [theaterAddress, setTheaterAddress] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [theaterNameError, setTheaterNameError] = useState("");
  const [theaterAddressError, setTheaterAddressError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isCreatePasswordVisible, setIsCreatePasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        navigate("/Home")
      }
    });
    document.title = 'Sign Up';
  },[auth,navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google sign-in successful!", user);

      // Optionally, add the user to your Firebase database or do any additional setup here
      await firebase.addUser(user.uid, { name: user.displayName, email: user.email, phone: user.phoneNumber || "", isAdmin: false, wallet: 2000 });
      navigate('/Home');
    } catch (error) {
      console.error("Google sign-in error:", error.message);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetErrors = () => {
    setNameError("");
    setEmailError("");
    setPhoneError("");
    setTheaterNameError("");
    setTheaterAddressError("");
    setPasswordError("");
    setError("")
  }
  const toggleCreatePasswordVisibility = () => {
    setIsCreatePasswordVisible(!isCreatePasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const validateForm = () => {
    let isValid = true;
    if (name === "") {
      setNameError("(Required Field)");
      isValid = false;
    }

    if (email === "") {
      setEmailError("(Required Field)");
      isValid = false;
    }
    if (!phone.match(/^(\+\d{1,3}[- ]?)?\d{10}$/) || phone.match(/0{5,}/)) {
      setPhoneError("(Invalid Phone Number)");
      isValid = false;
    }

    if (isAdmin === true) {
      if (theaterName === "") {
        setTheaterNameError("(Invalid Theater name)");
        isValid = false;
      }
      if (theaterAddress === "") {
        setTheaterAddressError("(Invalid Theater address)");
        isValid = false;
      }
    }

    if (createPassword !== confirmPassword) {
      setPasswordError("(Passwords are not matching)")
      isValid = false;
    } else {
      if (createPassword.length < 8) {
        setPasswordError("(Password must be more than 8 characters)");
        isValid = false;
      }
      else if (!createPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#%&*?])[A-Za-z\d@!#%&*?]{8,}$/)) {
        setPasswordError('(Please include lowercase, uppercase, special characters)');
        isValid = false;
      }
    }
    return isValid;
  }

  const handleSignUp = () => {
    resetErrors();
    let isValid = validateForm()
    if (isValid === true) {
      setIsLoading(true);
      setError("")
      firebase.signupUserWithEmailAndPassword(email, createPassword)
        .then((userCredential) => {
          console.log("User signed up successfully!");
          if (isAdmin === true) {
            firebase.addUser(userCredential.user.uid, { name, email, phone, isAdmin, theaterName, theaterAddress, wallet:2000 })
              .then(() => {
                console.log("User data successfully stored in Firebase");
                navigate("/Login");
                setName("")
                setEmail("")
                setPhone("")
                setCreatePassword("")
                setConfirmPassword("")
              })
              .catch((error) => {
                console.error("Error storing user data in Firebase", error);
                setError("Database error")
              });
          }
          else {
            firebase.addUser(userCredential.user.uid, { name, email, phone, isAdmin, wallet:2000 })
              .then(() => {
                console.log("User data successfully stored in Firebase");
                navigate('/Login');
                setName("")
                setEmail("")
                setPhone("")
                setCreatePassword("")
                setConfirmPassword("")
              })
              .catch((error) => {
                console.error("Error storing user data in Firebase", error);
                setError("Database error")
              });
          }
        })
        .catch(error => {
          console.error("Error signing up:", error.message);
          if (error.message === "Firebase: Error (auth/email-already-in-use).")
            setError("Can't Sign Up, Email address already in use");
          else if (error.message === "Firebase: Error (auth/invalid-email).")
            setError("Can't Sign Up, Invalid email");
          else
            setError("Can't Sign Up, Unexpected error occured !!");
        })
        .finally(() => {
          setIsLoading(false);
        })
    };
  }

  return (  
    <>
      <div className="signup" style={{ backgroundImage: `url(${movie})` } }>
        <div className="signup-card">
          <div className="signup-heading text-center myb-20">Sign Up</div>
          
          {/* Google Signup Option*/}
          <div className="google-signup">
            <button onClick={handleGoogleSignIn} className="google-btn">
              <img src="googleLogo.png" alt="Google Logo" />
                Sign up with Google
            </button>
          </div>
        
          <div className="signup-subheading myb-20">
            Please provide your name, email address, and phone number.
          </div>

          <label htmlFor="username" className="label-text">
            Name
            <span className="error-inline">{nameError}</span>
          </label>
          <input
            type="text"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`input-field ${nameError !== "" ? 'error-input-field' : ''}`}
            placeholder="e.g. John Doe"
          />

          <label htmlFor="email" className="label-text">
            Email 
            <br/>
            <span className="error-inline">{emailError}</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`input-field ${emailError !== "" ? 'error-input-field' : ''}`}
            placeholder="e.g. example@gmail.com"
          />

          <label htmlFor="phone" className="label-text">
            Phone Number 
            <br/>
            <span className="error-inline">{phoneError}</span>
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`input-field ${phoneError !== "" ? 'error-input-field' : ''}`}
            placeholder="e.g. 1234567890"
          />

          <label className="label-text">
            Want to list your show?
          </label>

          <div className="flex align-center myb-20">
            <input type="radio" name="isAdmin" id="admin-yes" value="true" className="mxl-10"
              onChange={(e) => setIsAdmin(e.target.value == 'true')} /><label htmlFor="admin-yes" style={{marginLeft:'3px'}}>Yes</label>
            <input type="radio" name="isAdmin" id="admin-no" value="false" className="mxl-10"
              onChange={(e) => setIsAdmin(e.target.value == 'true')} /><label htmlFor="admin-no" style={{marginLeft: '3px'}}>No</label>
          </div>

          <div name='theater' className={isAdmin ? '' : 'hide-div'}>
            <label className="label-text">
              Theater Name 
              <br/>
              <span className="error-inline">{theaterNameError}</span>
            </label>
            <input
              type="text"
              value={theaterName}
              onChange={(e) => setTheaterName(e.target.value)}
              className={`input-field ${theaterNameError !== "" ? 'error-input-field' : ''}`}
              placeholder="e.g. Rahulraj PVR"
            />

            <label className="label-text">
              Theater Address
              <br/>
               <span className="error-inline">{theaterAddressError}</span>
            </label>
            <textarea
              value={theaterAddress}
              onChange={(e) => setTheaterAddress(e.target.value)}
              className={`input-field ${theaterAddressError !== "" ? 'error-input-field' : ''}`}
              placeholder="e.g. Robert Robertson, 1234 NW Bobcat Lane"
            />
          </div>
          

          <label htmlFor="createPassword" className="label-text">
              Create Password 
              <br />
              <span className="error-inline">{passwordError}</span>
          </label>
          <div className="input-wrapper create-password-wrapper">
              <input
                  type={isCreatePasswordVisible ? "text" : "password"}
                  id="createPassword"
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                  placeholder="Create Password"
                  className={`input-field ${passwordError !== "" ? 'error-input-field' : ''}`}
              />
              <button
                  type="button"
                  className="password-toggle"
                  onClick={toggleCreatePasswordVisibility} 
              >
                  {isCreatePasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
          </div>

          <label htmlFor="confirmPassword" className="label-text">
              Confirm Password
              <br />
              <span className="error-inline">{passwordError}</span>
          </label>
          <div className="input-wrapper confirm-password-wrapper">
              <input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className={`input-field ${passwordError !== "" ? 'error-input-field' : ''}`}
              />
              <button
                  type="button"
                  className="password-toggle"
                  onClick={toggleConfirmPasswordVisibility} // Call the correct function
              >
                  {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
          </div>


          <div className={isLoading ? 'show-loader' : 'hide-div'}>
            <img src={loader_icon} alt="Loader Icon" />
          </div>

          <span className="error">{error}</span>

          <button className="btn" onClick={() => { handleSignUp(); }}>Sign Up</button>
          <div className="terms-condition">
            By clicking the button, you are agreeing to our Terms and Services
          </div>
          <span style={{marginTop: '20px', fontSize: '15px', display: 'block', textAlign: 'center'}}>Already have an account <Link to="/Login" style={{color: '#f84464'}}>Login</Link></span>
        </div>
      </div>
    </>
  );
};

export default SignUp;
