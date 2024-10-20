import React, { useState, useEffect } from "react";
import "./style.css";
import "./utils.css";
import loader_icon from "../assets/icons/loader_icon.gif";
import { useFirebase } from "../context/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../components/Navbar.css";

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
  }, [auth, navigate]);

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
    <>
      <div className="flex min-h-screen w-full items-center justify-center text-gray-600 bg-gray-50">
        <div className="relative">
          <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
            <svg
              id="patternId"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="a"
                  patternUnits="userSpaceOnUse"
                  width="40"
                  height="40"
                  patternTransform="scale(0.6) rotate(0)"
                >
                  <rect x="0" y="0" width="100%" height="100%" fill="none" />
                  <path
                    d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                    strokeWidth="1"
                    stroke="none"
                    fill="#f43f5e"
                  />
                </pattern>
              </defs>
              <rect
                width="800%"
                height="800%"
                transform="translate(0,0)"
                fill="url(#a)"
              />
            </svg>
          </div>
          <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
            <svg
              id="patternId"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="b"
                  patternUnits="userSpaceOnUse"
                  width="40"
                  height="40"
                  patternTransform="scale(0.5) rotate(0)"
                >
                  <rect x="0" y="0" width="100%" height="100%" fill="none" />
                  <path
                    d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                    strokeWidth="1"
                    stroke="none"
                    fill="#f43f5e"
                  />
                </pattern>
              </defs>
              <rect
                width="800%"
                height="800%"
                transform="translate(0,0)"
                fill="url(#b)"
              />
            </svg>
          </div>
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
            <div className="flex-auto p-6">
              <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <a
                  href="/"
                  className="flex cursor-pointer items-center gap-2 text-rose-500 no-underline hover:text-indigo-500"
                >
                  <span className="flex-shrink-0 text-3xl font-black tracking-tight opacity-100">
                    Ticketify
                  </span>
                </a>
              </div>
              <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">
                Welcome to Ticketify
              </h4>
              <p className="mb-6 text-gray-500">
                Please provide your email address and password.
              </p>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2 inline-block text-sm font-medium text-gray-700"
                >
                  Email or Username
                  <span className="text-red-600 ml-2.5">{emailError}</span>
                </label>
                <input
                  type="text"
                  className={`block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-3 px-3 text-sm outline-none focus:bg-white focus:text-gray-600 focus:shadow ${
                    emailError !== "" ? "border border-red-500" : ""
                  }`}
                  name="email"
                  placeholder="Enter your email"
                  autoFocus=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <div className="flex justify-between align-center">
                  <label
                    className="mb-2 inline-block text-sm font-medium text-gray-700"
                    htmlFor="password"
                  >
                    Password
                    <span className="text-red-600 ml-2.5">{passwordError}</span>
                  </label>
                  <Link
                    to="/ForgotPassword"
                    className="cursor-pointer text-rose-500 no-underline"
                  >
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <div className="relative flex w-full flex-wrap items-stretch">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    className={`relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-3 px-3 text-sm outline-none focus:shadow ${
                      passwordError !== "" ? "border border-red-600" : ""
                    }`}
                    name="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    className="password-toggle mt-0.5"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {error}
                </p>
              </div>

              <div
                className={isLoading ? "flex justify-center mb-1" : "hidden"}
              >
                <img
                  src={loader_icon}
                  className="w-12 h-12"
                  alt="Loader Icon"
                />
              </div>

              <div className="mb-4">
                <button
                  className="grid w-full cursor-pointer select-none rounded-md border border-red-500 py-2 px-5 text-center align-middle text-base font-semibold text-white shadow hover:border-rose-600 hover:bg-rose-600 hover:text-white focus:border-rose-600 focus:bg-rose-600 focus:text-white focus:shadow-none"
                  onClick={handleSignIn}
                  style={{backgroundColor: "#f84464"}}
                >
                  Sign in
                </button>
              </div>

              <p className="mb-4 text-center">
                New on Ticketify?
                <Link
                  to="/SignUp"
                  className="cursor-pointer no-underline" style={{color: "#f84464"}}
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
