import React, { useState, useEffect } from "react";
import './style.css';
import './utils.css';
import loader_icon from "../assets/icons/loader_icon.gif";
import { useFirebase } from "../context/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import '../components/Navbar.css';

const Login = () => {

  const firebase = useFirebase();
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/Home")
      }
    });
    document.title = 'Login';
  },[auth])

  const resetErrors = () => {
    setError("");
    setEmailError("");
    setPasswordError("");
  }

  const validateForm = () => {
    let isValid = true;
    if (email == "") {
      setEmailError("(Required Field)");
      isValid = false;
    }
    if (password == "") {
      setPasswordError("(Required Field)");
      isValid = false;
    }
    return isValid;
  }

  const handleSignIn = () => {
    resetErrors();
    let isValid = validateForm();
    if (isValid == true) {
      setIsLoading(true);
      setError("")
      firebase.loginUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log("User login successfully!");
          setEmail("")
          setPassword("")
          setError("")
        })
        .catch(error => {
          if (error.message == "Firebase: Error (auth/invalid-credential).")
            setError("Incorrect email or password")
          else if (error.message == "Firebase: Error (auth/invalid-email).")
            setEmailError("(Invalid Email)")
          else
            setError("Can't Sign In, Unexpected error occured !!")
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <div className="flex justify-center align-center" style={{ marginTop: '70px' }}>
        <div className="signup-card">
          <div className="signup-heading text-center myb-20">Login</div>
          <div className="signup-subheading myb-20">
            Please provide your email address and password.
          </div>

          <label htmlFor="email" className="label-text">
            Email <span className="error-inline mxl-10">{emailError}</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`input-field ${emailError !== "" ? 'error-input-field' : ''}`}
            placeholder="e.g. example@gmail.com"
          />

          <label htmlFor="password" className="label-text">
            Password <span className="error-inline mxl-10">{passwordError}</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`input-field ${passwordError !== "" ? 'error-input-field' : ''}`}
          />
          <div className={isLoading ? 'show-loader' : 'hide-div'}>
            <img src={loader_icon} alt="Loader Icon" />
          </div>
          <span className="error">{error}</span>

          <button className="btn" onClick={handleSignIn}>Login</button>
          <span style={{marginTop: '20px', fontSize: '15px', display: 'block', textAlign: 'center'}}>Don't have an account? <Link to="/SignUp" style={{color: '#f84464'}}>Sign Up</Link></span>
        </div>
      </div>
    </>
  );
};

export default Login;