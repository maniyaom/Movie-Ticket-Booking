import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/firebase";
import loader_icon from "../assets/icons/loader_icon.gif";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
        navigate("/Home");
      }
    });
    document.title = 'Sign Up';
  }, [auth, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
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
    if (isAdmin) {
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
      setPasswordError("(Passwords are not matching)");
      isValid = false;
    } else {
      if (createPassword.length < 8) {
        setPasswordError("(Password must be more than 8 characters)");
        isValid = false;
      } else if (!createPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#%&*?])[A-Za-z\d@!#%&*?]{8,}$/)) {
        setPasswordError('(Please include lowercase, uppercase, special characters)');
        isValid = false;
      }
    }
    return isValid;
  };

  const handleSignUp = () => {
    resetErrors();
    let isValid = validateForm();
    if (isValid) {
      setIsLoading(true);
      setError("");
      firebase.signupUserWithEmailAndPassword(email, createPassword)
        .then((userCredential) => {
          const userData = { name, email, phone, isAdmin, wallet: 2000 };
          if (isAdmin) {
            userData.theaterName = theaterName;
            userData.theaterAddress = theaterAddress;
          }
          return firebase.addUser(userCredential.user.uid, userData);
        })
        .then(() => {
          navigate("/Login");
          resetForm();
        })
        .catch((error) => {
          handleSignUpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCreatePassword("");
    setConfirmPassword("");
  };

  const handleSignUpError = (message) => {
    switch (message) {
      case "Firebase: Error (auth/email-already-in-use).":
        setError("Can't Sign Up, Email address already in use");
        break;
      case "Firebase: Error (auth/invalid-email).":
        setError("Can't Sign Up, Invalid email");
        break;
      default:
        setError("Can't Sign Up, Unexpected error occurred !!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen flex-wrap text-slate-800">
      <div className="flex w-full flex-col md:w-1/2">
        <div className="my-auto mx-auto flex flex-col justify-center px-6 py-8 md:justify-start lg:w-[28rem]">
          <p className="text-center text-3xl font-bold md:text-left md:leading-tight">Create your account</p>
          <p className="mt-6 text-center font-medium md:text-left">
            Already using a password manager?
            <Link to="/Login" className="whitespace-nowrap font-semibold text-blue-700 mx-1">Login here</Link>
          </p>
          <button
            className="mt-8 flex items-center justify-center rounded-md border px-4 py-2 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-black hover:text-white focus:ring-2"
            onClick={handleGoogleSignIn}
          >
            <img className="mr-2 h-5 w-5" src="googleLogo.png" alt="Google logo" />
            Sign up with Google
          </button>
          <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
            <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">Or use your email</div>
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
                {nameError && <span className="text-red-600">{nameError}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                {emailError && <span className="text-red-600">{emailError}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
                {phoneError && <span className="text-red-600">{phoneError}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Theater Name</label>
                <input
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  type="text"
                  value={theaterName}
                  onChange={(e) => setTheaterName(e.target.value)}
                  placeholder="Enter your theater name"
                />
                {theaterNameError && <span className="text-red-600">{theaterNameError}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Theater Address</label>
                <input
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  type="text"
                  value={theaterAddress}
                  onChange={(e) => setTheaterAddress(e.target.value)}
                  placeholder="Enter your theater address"
                />
                {theaterAddressError && <span className="text-red-600">{theaterAddressError}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Create Password</label>
                <div className="flex items-center">
                  <input
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    type={isCreatePasswordVisible ? 'text' : 'password'}
                    value={createPassword}
                    onChange={(e) => setCreatePassword(e.target.value)}
                    placeholder="Create your password"
                  />
                  <button type="button" onClick={toggleCreatePasswordVisibility}>
                    {isCreatePasswordVisible ? <FaEyeSlash className="ml-2" /> : <FaEye className="ml-2" />}
                  </button>
                </div>
                {passwordError && <span className="text-red-600">{passwordError}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="flex items-center">
                  <input
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                  />
                  <button type="button" onClick={toggleConfirmPasswordVisibility}>
                    {isConfirmPasswordVisible ? <FaEyeSlash className="ml-2" /> : <FaEye className="ml-2" />}
                  </button>
                </div>
                {passwordError && <span className="text-red-600">{passwordError}</span>}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                type="submit"
                className={`flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-white ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} transition duration-300`}
                disabled={isLoading}
              >
                {isLoading ? <img src={loader_icon} alt="Loading" className="h-5" /> : "Sign Up"}
              </button>
              {error && <span className="text-red-600">{error}</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
