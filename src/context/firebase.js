import { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail as resetEmail,
} from "firebase/auth";
import { getDatabase, set, ref, push, get } from "firebase/database";
import {
  getDownloadURL as getStorageDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  databaseUrl: process.env.REACT_APP_DATABASE_URL,
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

// Context for Firebase functionalities
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state for UI updates

  // Sign-in using Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider(); // Initialize Google Auth provider
    setLoading(true);
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;
      console.log("User signed in with Google:", user);

      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);
      if (!snapshot.exists()) {
        await addUser(user.uid, {
          email: user.email,
          displayName: user.displayName,
        });
        console.log("New account created:", {
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        const existingUser = snapshot.val();
        console.log("User already exists:", existingUser);
      }
      navigate("/Home");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signupUserWithEmailAndPassword = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.error("Error signing up user:", error);
      throw error;
    }
  };

  // Log in with email and password
  const loginUserWithEmailAndPassword = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

  // Send password reset email (forgot password)
  const sendPasswordResetEmail = async (email) => {
    try {
      await resetEmail(firebaseAuth, email);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error;
    }
  };

  // Add user to the database
  const addUser = async (uid, data) => {
    try {
      data["uid"] = uid;
      await set(ref(database, `users/${uid}`), data);
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };

  // Add a movie and upload its poster
  const addMovie = async (data, moviePoster) => {
    try {
      const moviesRef = push(ref(database, "movies"));
      const movieId = moviesRef.key;
      data["movieId"] = movieId;
      await set(ref(database, `movies/${movieId}`), data);
      const posterRef = storageRef(storage, `moviePosters/${movieId}`);
      await uploadBytes(posterRef, moviePoster);
    } catch (error) {
      console.error("Error adding movie:", error);
      throw error;
    }
  };

  // Fetch all movies
  const fetchAllMovies = async () => {
    try {
      const snapshot = await get(ref(database, "movies"));
      const moviesData = snapshot.val();
      return moviesData ? Object.values(moviesData) : [];
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  };

  // Fetch movie poster URL
  const fetchMoviePoster = async (posterPath) => {
    try {
      const posterRef = storageRef(storage, `moviePosters/${posterPath}`);
      return await getStorageDownloadURL(posterRef);
    } catch (error) {
      console.error("Error fetching poster:", error);
      return null;
    }
  };

  // Fetch user details from database
  const fetchUserDetails = async (userId) => {
    try {
      const snapshot = await get(ref(database, "users"));
      const userData = snapshot.val();
      if (userData) {
        const userArray = Object.values(userData);
        const user = userArray.find((user) => user.uid === userId);
        return user ? user : "User not found";
      } else {
        return "No users found";
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  // Fetch movie details from the database
  const fetchMovieDetails = async (movieId) => {
    try {
      const snapshot = await get(ref(database, "movies"));
      const movieData = snapshot.val();
      if (movieData) {
        const movieArray = Object.values(movieData);
        const movie = movieArray.find((movie) => movie.movieId === movieId);
        return movie ? movie : "Movie not found";
      } else {
        return "No movies found";
      }
    } catch (error) {
      console.log("Error fetching movie details:", error);
      throw error;
    }
  };

  // Update any data in the database
  const updateData = async (path, newValue) => {
    try {
      await set(ref(database, path), newValue);
      return "Data Updated successfully";
    } catch (error) {
      console.error("Error updating database:", error);
      throw error;
    }
  };

  // Process a movie ticket payment
  const makePayment = async (
    subtotal,
    updatedSeats,
    seatList,
    movieDetails,
    userData
  ) => {
    const now = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[now.getMonth()];
    const day = String(now.getDate()).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const formattedTime = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;

    try {
      const ticketRef = push(ref(database, "tickets"));
      const ticketId = ticketRef.key;
      const data = {
        ticketId: ticketId,
        paidBy: userData.uid,
        receivedBy: movieDetails.creatorId,
        movieId: movieDetails.movieId,
        userEmail: userData.email,
        userPhone: userData.phone,
        theaterName: movieDetails.theaterName,
        theaterAddress: movieDetails.theaterAddress,
        movieDuration: movieDetails.movieDuration,
        movieLanguage: movieDetails.movieLanguage,
        movieTiming: movieDetails.movieTiming,
        movieTitle: movieDetails.movieTitle,
        transactionTime: formattedTime,
        bookedSeats: seatList,
        subtotal: subtotal,
        ticketValidity: true,
      };
      await updateData(`movies/${movieDetails.movieId}/theaterSeats`, updatedSeats);
      await updateData(`users/${userData.uid}/wallet`, userData.wallet - subtotal);
      const creatorData = await fetchUserDetails(movieDetails.creatorId);
      await updateData(`users/${movieDetails.creatorId}/wallet`, creatorData.wallet + subtotal);
      await set(ref(database, `tickets/${ticketId}`), data);
    } catch (error) {
      console.error("Transaction Failed !!", error);
      throw error;
    }
  };

  // Fetch transaction details for a user
  const fetchTransactionDetails = async (uid) => {
    try {
      const snapshot = await get(ref(database, "tickets"));
      const ticketsData = snapshot.val();
      if (!ticketsData) {
        console.log("No tickets data found.");
        return [];
      }
      const ticketArray = Object.values(ticketsData);
      const paid = ticketArray.filter((ticket) => uid === ticket.paidBy);
      const received = ticketArray.filter((ticket) => uid === ticket.receivedBy);
      return { paid, received };
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      throw error;
    }
  };

  const isLoading = () => loading;

  return (
    <FirebaseContext.Provider
      value={{
        signInWithGoogle,
        signupUserWithEmailAndPassword,
        loginUserWithEmailAndPassword,
        sendPasswordResetEmail,
        addUser,
        addMovie,
        fetchAllMovies,
        fetchMoviePoster,
        fetchUserDetails,
        fetchMovieDetails,
        updateData,
        makePayment,
        fetchTransactionDetails,
        isLoading,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
