import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useFirebase } from "../context/firebase";

const VerifyMail = () => {
  const firebase = useFirebase();
  const { encryptedEmail } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Decrypt the email
  const decryptedEmail = CryptoJS.AES.decrypt(
    encryptedEmail,
    "secret"
  ).toString(CryptoJS.enc.Utf8);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await firebase.updateEmailVerified(decryptedEmail);
        navigate("/Login");
      } catch (error) {
        console.error("Error verifying email:", error);
        setError("There was an error verifying your email. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [decryptedEmail, firebase, navigate]);

  return (
    <div>
      {loading ? (
        <p>Verifying your email, please wait...</p> // Loading message
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p> // Error message
      ) : (
        <p>Your email has been successfully verified! You can now log in.</p> // Success message
      )}
    </div>
  );
};

export default VerifyMail;
