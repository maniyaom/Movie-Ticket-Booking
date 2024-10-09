import React, { useState, useEffect } from "react";
import loader_icon from "../assets/icons/loader_icon.gif";
import { useFirebase } from "../context/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

  const validateEmailFormat = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateForm = () => {
    let isValid = true;
    if (email === "") {
      setEmailError("(Required Field)");
      isValid = false;
    } else if (!validateEmailFormat(email)) {
      setEmailError("(Invalid Email Format)");
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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 my-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-[#F84464] text-2xl font-bold text-center mb-4">Login</h1>
        <p className="text-center mb-6 text-gray-600">
          Please provide your email address and password.
        </p>

        <label htmlFor="email" className="text-[#F84464] block text-sm font-medium mb-1">
          Email <span className="text-red-500">{emailError}</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border rounded-md p-2 w-full mb-4 ${emailError && 'border-red-500'}`}
          placeholder="e.g. example@gmail.com"
        />

        <label htmlFor="password" className="text-[#F84464] block text-sm font-medium mb-1">
          Password <span className="text-red-500">{passwordError}</span>
        </label>
        <div className="relative mb-4">
          <input
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`border rounded-md p-2 w-full ${passwordError && 'border-red-500'}`}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-2 cursor-pointer"
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {isLoading && (
          <div className="flex justify-center mb-4">
            <img src={loader_icon} alt="Loading..." className="w-5 h-5" />
          </div>
        )}
        <span className="text-red-500">{error}</span>

        <button
          onClick={handleSignIn}
          className="bg-[#F84464] text-white rounded-lg p-2 w-full mt-4"
        >
          Login
        </button>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/SignUp" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
