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
        const uid = user.uid;
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
      console.log("Google sign-in successful!", user);
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
          console.log("User signed up successfully!");
          const userData = { name, email, phone, isAdmin, wallet: 2000 };
          if (isAdmin) {
            userData.theaterName = theaterName;
            userData.theaterAddress = theaterAddress;
          }
          firebase.addUser(userCredential.user.uid, userData)
            .then(() => {
              console.log("User data successfully stored in Firebase");
              navigate("/Login");
              resetForm();
            })
            .catch((error) => {
              console.error("Error storing user data in Firebase", error);
              setError("Database error");
            });
        })
        .catch(error => {
          console.error("Error signing up:", error.message);
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
    if (message === "Firebase: Error (auth/email-already-in-use).") {
      setError("Can't Sign Up, Email address already in use");
    } else if (message === "Firebase: Error (auth/invalid-email).") {
      setError("Can't Sign Up, Invalid email");
    } else {
      setError("Can't Sign Up, Unexpected error occurred !!");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white my-8 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-[#F84464] text-2xl font-semibold text-center mb-6">Sign Up</h2>

        {/* Google Signup Option */}
        <div className="mb-4">
          <button onClick={handleGoogleSignIn} className="flex items-center gap-x-4 px-4 py-2 border-2 rounded-full mx-auto">
            <img src="googleLogo.png" alt="Google Logo" className="w-[1rem] h-[1rem] object-cover" />
            Sign up with Google
          </button>
        </div>

        <p className="text-center mb-6">Please provide your name, email address, and phone number.</p>

        <label htmlFor="username" className="text-[#F84464] block text-sm font-medium mb-1">
          Name <span className="text-red-500">{nameError}</span>
        </label>
        <input
          type="text"
          id="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`border rounded-md p-2 w-full mb-4 ${nameError && 'border-red-500'}`}
          placeholder="e.g. John Doe"
        />

        <label htmlFor="email" className="text-[#F84464] block text-sm font-medium mb-1">
          Email <span className="text-red-500">{emailError}</span>
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border rounded-md p-2 w-full mb-4 ${emailError && 'border-red-500'}`}
          placeholder="e.g. example@gmail.com"
        />

        <label htmlFor="phone" className="text-[#F84464] block text-sm font-medium mb-1">
          Phone Number <span className="text-red-500">{phoneError}</span>
        </label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`border rounded-md p-2 w-full mb-4 ${phoneError && 'border-red-500'}`}
          placeholder="e.g. 1234567890"
        />

        <label className="text-[#F84464] block text-sm font-medium mb-1">Want to list your show?</label>
        <div className="flex mb-4">
          <label className="flex items-center mr-4">
            <input type="radio" name="isAdmin" value="true" checked={isAdmin} onChange={() => setIsAdmin(true)} />
            <span className="ml-2">Yes</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="isAdmin" value="false" checked={!isAdmin} onChange={() => setIsAdmin(false)} />
            <span className="ml-2">No</span>
          </label>
        </div>

        {isAdmin && (
          <>
            <label htmlFor="theater-name" className="text-[#F84464] block text-sm font-medium mb-1">
              Theater Name <span className="text-red-500">{theaterNameError}</span>
            </label>
            <input
              type="text"
              id="theater-name"
              value={theaterName}
              onChange={(e) => setTheaterName(e.target.value)}
              className={`border rounded-md p-2 w-full mb-4 ${theaterNameError && 'border-red-500'}`}
              placeholder="e.g. Grand Theater"
            />

            <label htmlFor="theater-address" className="text-[#F84464] block text-sm font-medium mb-1">
              Theater Address <span className="text-red-500">{theaterAddressError}</span>
            </label>
            <input
              type="text"
              id="theater-address"
              value={theaterAddress}
              onChange={(e) => setTheaterAddress(e.target.value)}
              className={`border rounded-md p-2 w-full mb-4 ${theaterAddressError && 'border-red-500'}`}
              placeholder="e.g. 123 Main St, City"
            />
          </>
        )}

        <label htmlFor="create-password" className="text-[#F84464] block text-sm font-medium mb-1">
          Create Password <span className="text-red-500">{passwordError}</span>
        </label>
        <div className="relative mb-4">
          <input
            type={isCreatePasswordVisible ? "text" : "password"}
            id="create-password"
            value={createPassword}
            onChange={(e) => setCreatePassword(e.target.value)}
            className={`border rounded-md p-2 w-full ${passwordError && 'border-red-500'}`}
            placeholder="Create Password"
          />
          <span onClick={toggleCreatePasswordVisibility} className="absolute right-3 top-2 cursor-pointer">
            {isCreatePasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <label htmlFor="confirm-password" className="text-[#F84464] block text-sm font-medium mb-1">
          Confirm Password <span className="text-red-500">{passwordError}</span>
        </label>
        <div className="relative mb-6">
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`border rounded-md p-2 w-full ${passwordError && 'border-red-500'}`}
            placeholder="Confirm Password"
          />
          <span onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-2 cursor-pointer">
            {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-red-500">{error}</span>
          {isLoading ? (
            <img src={loader_icon} alt="Loading..." className="w-5 h-5" />
          ) : (
            <button
              onClick={handleSignUp}
              className="bg-[#F84464] text-white rounded-lg p-2 w-full"
            >
              Sign Up
            </button>
          )}
        </div>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/Login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
