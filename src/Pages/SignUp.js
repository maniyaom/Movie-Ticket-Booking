import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/firebase";
import loader_icon from "../assets/icons/loader_icon.gif";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import google_logo from "../assets/icons/google-logo.png";
import "./utils.css";
import "../components/Navbar.css";

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
  const [errors, setErrors] = useState({});
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [theaterNameError, setTheaterNameError] = useState("");
  const [theaterAddressError, setTheaterAddressError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isCreatePasswordVisible, setIsCreatePasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        navigate("/Home");
      }
    });
    document.title = "Sign Up";
  }, [auth, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google sign-in successful!", user);

      await firebase.addUser(user.uid, {
        name: user.displayName,
        email: user.email,
        phone: user.phoneNumber || "",
        isAdmin: false,
        wallet: 2000,
      });
      navigate("/Home");
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
    setError("");
  };
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
    let error = {};
    if (name === "") {
      error.name = "(Required Field)";
    }

    if (email === "") {
      error.email = "(Required Field)";
    } else if (!validateEmailFormat(email)) {
      error.email = "(Invalid Email Format)";
    }
    if (!phone.match(/^(\+\d{1,3}[- ]?)?\d{10}$/) || phone.match(/0{5,}/)) {
      error.phone = "(Invalid Phone Number)";
    }

    if (isAdmin === true) {
      if (theaterName === "") {
        error.theaterName = "(Invalid Theater name)";
      }
      if (theaterAddress === "") {
        error.theaterAddress = "(Invalid Theater address)";
      }
    }

    if (createPassword !== confirmPassword) {
      error.confirmPassword = "(Passwords are not matching)";
    } else {
      if (createPassword.length < 8) {
        error.createPassword = "(Password must be more than 8 characters)";
      } else if (
        !createPassword.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#%&*?])[A-Za-z\d@!#%&*?]{8,}$/
        )
      ) {
        error.createPassword =
          "(Please include lowercase, uppercase, special characters)";
      }
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSignUp = () => {
    resetErrors();
    let isValid = validateForm();
    if (isValid === true) {
      setIsLoading(true);
      setError("");
      firebase
        .signupUserWithEmailAndPassword(email, createPassword)
        .then((userCredential) => {
          console.log("User signed up successfully!");
          if (isAdmin === true) {
            firebase
              .addUser(userCredential.user.uid, {
                name,
                email,
                phone,
                isAdmin,
                theaterName,
                theaterAddress,
                wallet: 2000,
              })
              .then(() => {
                console.log("User data successfully stored in Firebase");
                navigate("/Login");
                setName("");
                setEmail("");
                setPhone("");
                setCreatePassword("");
                setConfirmPassword("");
              })
              .catch((error) => {
                console.error("Error storing user data in Firebase", error);
                setError("Database error");
              });
          } else {
            firebase
              .addUser(userCredential.user.uid, {
                name,
                email,
                phone,
                isAdmin,
                wallet: 2000,
              })
              .then(() => {
                console.log("User data successfully stored in Firebase");
                navigate("/Login");
                setName("");
                setEmail("");
                setPhone("");
                setCreatePassword("");
                setConfirmPassword("");
              })
              .catch((error) => {
                console.error("Error storing user data in Firebase", error);
                setError("Database error");
              });
          }
        })
        .catch((error) => {
          console.error("Error signing up:", error.message);
          if (error.message === "Firebase: Error (auth/email-already-in-use).")
            setErrors({
              authError: "Can't Sign Up, Email address already in use",
            });
          else if (error.message === "Firebase: Error (auth/invalid-email).")
            setErrors({ authError: "Can't Sign Up, Invalid email" });
          else
            setErrors({
              authErrors: "Can't Sign Up, Unexpected error occured !!",
            });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const tempmethod = (value) => {
    console.log(value);
    setIsAdmin(value === "true");
  };

  return (
    <>
      <div className="flex justify-center align-center h-screen w-screen flex-wrap text-slate-800 ">
        <div className="flex w-full flex-col md:w-1/2 relative sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
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
            <p className="text-center text-3xl font-bold md:text-left md:leading-tight">
              Create your account
            </p>

            <button
              className="mt-8 flex items-center justify-center rounded-md border px-4 py-2 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-black hover:text-white focus:ring-2"
              onClick={handleGoogleSignIn}
            >
              <img
                className="mr-2 h-5 w-5"
                src={google_logo}
                alt="Google logo"
              />
              Sign Up with Google
            </button>
            <div className="relative mt-8 mb-6 flex h-px place-items-center bg-gray-200">
              <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">
                Or use email instead
              </div>
            </div>
            <div className="mb-4 flex flex-col w-full">
              <label
                htmlFor="nameOfTheUser"
                className="mb-2 inline-block text-sm font-medium text-gray-700"
              >
                Name
                <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.name}
                </span>
              </label>
              <input
                type="text"
                className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-3 px-3 text-sm outline-none focus:bg-white focus:text-gray-600 focus:shadow"
                id="nameOfTheUser"
                name="nameOfTheUser"
                placeholder="Enter Your Name"
                autoFocus=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <div className="flex justify-between align-center">
                <label
                  className="mb-2 inline-block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                  <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.email}
                  </span>
                </label>
              </div>
              <div className="relative flex flex-col w-full flex-wrap items-stretch">
                <input
                  type="email"
                  id="email"
                  className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-3 px-3 text-sm outline-none focus:bg-white focus:text-gray-600 focus:shadow"
                  name="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between align-center">
                <label
                  className="mb-2 inline-block text-sm font-medium text-gray-700"
                  htmlFor="phone"
                >
                  Phone
                  <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.phone}
                  </span>
                </label>
              </div>
              <div className="relative flex flex-col w-full flex-wrap items-stretch">
                <input
                  type="number"
                  id="phone"
                  className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-3 px-3 text-sm outline-none focus:bg-white focus:text-gray-600 focus:shadow"
                  name="email"
                  placeholder="Enter your Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between align-center">
                <label className="mb-2 inline-block text-sm font-medium text-gray-700">
                  Want to list your show?
                </label>
              </div>

              <div className="flex items-center mb-5">
                <input
                  type="radio"
                  name="isAdmin"
                  id="admin-yes"
                  value="true"
                  className="mxl-10"
                  onChange={(e) => setIsAdmin(true)}
                  checked={isAdmin === true}
                />
                <label htmlFor="admin-yes" style={{ marginLeft: "3px" }}>
                  Yes
                </label>
                <input
                  type="radio"
                  name="isAdmin"
                  id="admin-no"
                  value="false"
                  className="mxl-10"
                  onChange={(e) => setIsAdmin(false)}
                  checked={isAdmin === false}
                />
                <label htmlFor="admin-no" style={{ marginLeft: "3px" }}>
                  No
                </label>
              </div>
            </div>

            <div name="theater" className={isAdmin ? "" : "hidden"}>
              <div className="mb-4">
                <div className="flex justify-between align-center">
                  <label className="mb-2 inline-block text-sm font-medium text-gray-700">
                    Theater Name
                    <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors.theaterName}
                    </span>
                  </label>
                </div>

                <div className="relative flex flex-col w-full flex-wrap items-stretch">
                  <input
                    type="text"
                    className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-3 px-3 text-sm outline-none focus:bg-white focus:text-gray-600 focus:shadow"
                    placeholder="e.g. Rahulraj PVR"
                    value={theaterName}
                    onChange={(e) => setTheaterName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between align-center">
                  <label className="mb-2 inline-block text-sm font-medium text-gray-700">
                    Theater Address
                    <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors.theaterAddress}
                    </span>
                  </label>
                </div>

                <div className="relative flex flex-col w-full flex-wrap items-stretch">
                  <textarea
                    className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-3 px-3 text-sm outline-none focus:bg-white focus:text-gray-600 focus:shadow"
                    placeholder="e.g. Robert Robertson, 1234 NW Bobcat Lane"
                    value={theaterAddress}
                    onChange={(e) => setTheaterAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between align-center">
                <label
                  className="mb-2 inline-block text-sm font-medium text-gray-700"
                  htmlFor="createPassword"
                >
                  Create Password
                  <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.createPassword}
                  </span>
                </label>
              </div>
              <div className="relative flex flex-col w-full flex-wrap items-stretch">
                <input
                  id="createPassword"
                  className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-3 px-3 text-sm outline-none focus:bg-white focus:text-gray-600 focus:shadow"
                  name="createPassword"
                  placeholder="Create Password"
                  type={isCreatePasswordVisible ? "text" : "password"}
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle mt-1"
                  onClick={toggleCreatePasswordVisibility}
                >
                  {isCreatePasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between align-center">
                <label
                  className="mb-2 inline-block text-sm font-medium text-gray-700"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                  <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.confirmPassword}
                  </span>
                </label>
              </div>
              <div className="relative flex flex-col w-full flex-wrap items-stretch">
                <input
                  id="confirmPassword"
                  className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-3 px-3 text-sm outline-none focus:bg-white focus:text-gray-600 focus:shadow"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle mt-1"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className={isLoading ? "show-loader" : "hide-div"}>
              <img src={loader_icon} alt="Loader Icon" />
            </div>

            <p className="mb-3 text-sm text-red-600 dark:text-red-500">
              {errors.authError}
            </p>

            <div className="mb-2">
              <button
                className="grid w-full cursor-pointer select-none rounded-md border border-red-500 py-2 px-5 text-center align-middle text-base font-semibold text-white shadow hover:border-red-600 hover:bg-red-600 hover:text-white focus:border-red-600 focus:bg-red-600 focus:text-white focus:shadow-none"
                onClick={() => {
                  handleSignUp();
                }}
                style={{ backgroundColor: "#f84464" }}
              >
                Sign Up
              </button>
              <p className="mt-6 text-center font-medium md:text-left">
                Already have account?
                <Link
                  to="/Login"
                  className="whitespace-nowrap font-semibold text-red-500 mx-1"
                >
                  Login here
                </Link>
              </p>
            </div>

            <div className="mb-4">
              <div className="block">
                <div className="inline">
                  <label
                    className="inline-block text-xs"
                    htmlFor="agree-terms-and-conditions"
                  >
                    By clicking the button, you are agreeing to our
                    <u>Terms & Conditions</u>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
