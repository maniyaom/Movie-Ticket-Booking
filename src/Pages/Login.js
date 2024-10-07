import React, { useState, useEffect } from "react";
import "./style.css";
import "./utils.css";
import loader_icon from "../assets/icons/loader_icon.gif";
import { useFirebase } from "../context/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../components/Navbar.css";
import { TextInput, PasswordInput } from '../components/Inputs'; 

const Login = () => {
  const firebase = useFirebase();
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/Home");
      }
    });
    document.title = "Login";
  }, [auth]);

  const resetErrors = () => {
    setError("");
    setEmailError("");
    setPasswordError("");
  };

  const validateForm = () => {
    let isValid = true;
    if (email === "") {
      setEmailError("(Required Field)");
      isValid = false;
    }
    if (password === "") {
      setPasswordError("(Required Field)");
      isValid = false;
    }
    return isValid;
  };

  const handleSignIn = () => {
    resetErrors();
    let isValid = validateForm();
    if (isValid) {
      setIsLoading(true);
      setError("");
      firebase
        .loginUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log("User logged in successfully!");
          setEmail("");
          setPassword("");
          setError("");
        })
        .catch((error) => {
          if (error.message === "Firebase: Error (auth/invalid-credential).")
            setError("Incorrect email or password");
          else if (error.message === "Firebase: Error (auth/invalid-email).")
            setEmailError("(Invalid Email)");
          else setError("Can't Sign In, Unexpected error occurred!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
<>
      <div className="flex justify-center align-center" style={{ marginTop: "70px" }}>
        <div className="signup-card">
          <div className="signup-heading text-center myb-20">Login</div>
          <div className="signup-subheading myb-20">
            Please provide your email address and password.
          </div>

          {/* Form Starts */}
          <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
            
            {/* Reusable Email Input Component */}
            <TextInput
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              placeholder="e.g. example@gmail.com"
            />

            {/* Reusable Password Input Component */}
            <PasswordInput
              label="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              placeholder="Password"
              isVisible={isPasswordVisible}
              toggleVisibility={togglePasswordVisibility}
            />

            {/* Loader */}
            <div className={isLoading ? "show-loader" : "hide-div"}>
              <img src={loader_icon} alt="Loader Icon" />
            </div>

            {/* Error Message */}
            <span className="error">{error}</span>

            {/* Submit Button */}
            <button className="btn" type="submit">
              Login
            </button>

            {/* Sign Up Link */}
            <span
              style={{
                marginTop: "20px",
                fontSize: "15px",
                display: "block",
                textAlign: "center",
              }}
            >
              Don't have an account{" "}
              <Link to="/SignUp" style={{ color: "#f84464" }}>
                Sign Up
              </Link>
            </span>
          </form>
          {/* Form Ends */}
        </div>
      </div>
    </>
  
  );
};

export default Login;