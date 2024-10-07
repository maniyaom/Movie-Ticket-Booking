import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/firebase";
import loader_icon from "../assets/icons/loader_icon.gif";
import { Link, useNavigate } from 'react-router-dom'
import { getAuth,GoogleAuthProvider,signInWithPopup, onAuthStateChanged } from "firebase/auth";

import './utils.css'
import '../components/Navbar.css';
import { TextInput, PasswordInput, TextAreaInput, RadioInput } from '../components/Inputs';

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

  const validateEmailFormat = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
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
    } else if (!validateEmailFormat(email)) {
      setEmailError("(Invalid Email Format)");
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
<div className="flex justify-center align-center" style={{ marginTop: '30px' }}>
      <div className="signup-card">
        <div className="signup-heading text-center myb-20">Sign Up</div>

        {/* Form Starts */}
        <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>

          {/* Google Signup Option */}
          <div className="google-signup">
            <button type="button" onClick={handleSignUp} className="google-btn">
              <img src="googleLogo.png" alt="Google Logo" />
              Sign up with Google
            </button>
          </div>

          <div className="signup-subheading myb-20">
            Please provide your name, email address, and phone number.
          </div>

          {/* Reusable Text Input Components */}
          <TextInput
            label="Name"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error}
            placeholder="e.g. John Doe"
          />

          <TextInput
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            placeholder="e.g. example@gmail.com"
          />

          <TextInput
            label="Phone Number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={error}
            placeholder="e.g. 1234567890"
          />

          {/* Reusable Radio Input Component */}
          <RadioInput
            label="Want to list your show?"
            name="isAdmin"
            options={[
              { id: 'admin-yes', value: 'true', label: 'Yes' },
              { id: 'admin-no', value: 'false', label: 'No' }
            ]}
            onChange={(e) => setIsAdmin(e.target.value === 'true')}
          />

          {/* Conditional Theater Inputs */}
          {isAdmin && (
            <>
              <TextInput
                label="Theater Name"
                value={theaterName}
                onChange={(e) => setTheaterName(e.target.value)}
                error={error}
                placeholder="e.g. Rahulraj PVR"
              />
              <TextAreaInput
                label="Theater Address"
                value={theaterAddress}
                onChange={(e) => setTheaterAddress(e.target.value)}
                error={error}
                placeholder="e.g. Robert Robertson, 1234 NW Bobcat Lane"
              />
            </>
          )}

          {/* Reusable Password Input Components */}
          <PasswordInput
            label="Create Password"
            id="createPassword"
            value={createPassword}
            onChange={(e) => setCreatePassword(e.target.value)}
            error={error}
            placeholder="Create Password"
            isVisible={isCreatePasswordVisible}
            toggleVisibility={toggleCreatePasswordVisibility}
          />

          <PasswordInput
            label="Confirm Password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error}
            placeholder="Confirm Password"
            isVisible={isConfirmPasswordVisible}
            toggleVisibility={toggleConfirmPasswordVisibility}
          />

          {/* Loader */}
          <div className={isLoading ? 'show-loader' : 'hide-div'}>
            <img src={loader_icon} alt="Loader Icon" />
          </div>

          {/* Error Message */}
          <span className="error">{error}</span>

          {/* Sign Up Button */}
          <button className="btn" type="submit">Sign Up</button>

          <div className="terms-condition">
            By clicking the button, you are agreeing to our Terms and Services
          </div>

          {/* Already have an account */}
          <span style={{ marginTop: '20px', fontSize: '15px', display: 'block', textAlign: 'center' }}>
            Already have an account <Link to="/Login" style={{ color: '#f84464' }}>Login</Link>
          </span>
        </form>
        {/* Form Ends */}
      </div>
    </div>
  );
};

export default SignUp;