import React, { useState } from "react";
import { Link } from "react-router-dom";
import loader_icon from "../assets/icons/loader_icon.gif";
import { useFirebase } from "../context/firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { sendPasswordResetEmail } = useFirebase();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(email);
      setMessage("A password reset link has been sent to your email.");
      setEmail("");
    } catch (error) {
      setError(
        "Failed to send password reset email. Please check the email address."
      );
      console.error("Error during password reset:", error);
    } finally {
      setIsLoading(false);
    }
  };

  document.title = "Forgot Password";

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-orange-400 to-orange-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Enter your email to receive password reset instructions.
        </p>
        {message && (
          <div className="text-green-500 text-center mb-4">{message}</div>
        )}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition-colors duration-300 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <img
                src={loader_icon}
                alt="Loading"
                className="h-5 w-5 mx-auto"
              />
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Remembered your password?
          <Link to="/Login" className="text-rose-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
