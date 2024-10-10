import React, { useState, useEffect } from "react";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [alerts, setAlerts] = useState({});
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        navigate("/Home");
      }
    });
    document.title = "Login";
  }, [auth]);

  const resetErrors = () => {
    setAuthError("");
  };

  const validateForm = () => {
    let isValid = true;
    if (email === "" || password === "") {
      setAuthError("Email and password are required.");
      isValid = false;
    }
    return isValid;
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    resetErrors();
    if (validateForm()) {
      setAlerts({ alertProcess: true });
      try {
        const userCredential = await firebase.loginUserWithEmailAndPassword(email, password);
        if (userCredential && userCredential.user.emailVerified) {
          setAlerts({ alertSuccess: true, success: true });
          setTimeout(() => {
            navigate("/Home");
            setAlerts({});
          }, 1000);
        } else {
          setAuthError("Please verify your email.");
        }
      } catch (error) {
        setAlerts({});
        if (error.code === "auth/invalid-credential") {
          setAuthError("Invalid email or password.");
        } else if (error.code === "auth/too-many-requests") {
          setAuthError("Too many attempts! Please try again later.");
        } else {
          setAuthError("An unexpected error occurred.");
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <div className="flex min-h-screen w-screen items-center justify-center bg-gray-50 text-gray-600">
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            <div className="mb-10 flex items-center justify-center">
              <a
                href="#"
                className="flex items-center gap-2 text-[#F84464] font-black tracking-tight text-3xl"
              >
                Password Manager
              </a>
            </div>
            <h4 className="mb-2 text-xl font-medium text-gray-700">Welcome to Password Manager</h4>
            <p className="mb-6 text-gray-500">Please sign in to access your account.</p>

            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2 inline-block text-sm font-medium text-gray-700"
                >
                  Email or Username
                </label>
                <input
                  type="text"
                  className="block w-full border rounded-md p-3 text-sm border-gray-400 focus:border-[#F84464] focus:shadow"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="mb-2 text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Link
                    to="/ForgotPassword"
                    className="text-[#F84464] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative flex items-stretch">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    className="w-full border rounded-md p-3 text-sm border-gray-400 focus:border-[#F84464] focus:shadow"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 cursor-pointer"
                  >
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <p className="mt-2 text-sm text-red-600">{authError}</p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#F84464] text-white rounded-md py-2 px-4 hover:bg-indigo-600"
              >
                Login
              </button>
            </form>
            <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/SignUp" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
