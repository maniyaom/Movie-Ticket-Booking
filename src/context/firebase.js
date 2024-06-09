import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref, push, get } from "firebase/database";
import { getDownloadURL as getStorageDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCk0BnFsJWBNRFpgVxD8D4yZb9cR9Ph698",
    authDomain: "movie-ticket-booking-39080.firebaseapp.com",
    projectId: "movie-ticket-booking-39080",
    storageBucket: "movie-ticket-booking-39080.appspot.com",
    messagingSenderId: "71799299976",
    appId: "1:71799299976:web:8f815c03921b6e21c5243d",
    measurementId: "G-STX5CT8CPN",
    databaseUrl: "https://movie-ticket-booking-39080-default-rtdb.firebaseio.com"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const signupUserWithEmailAndPassword = async (email, password) => {
        try {
            return await createUserWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            console.error("Error signing up user:", error);
            throw error;
        }
    };

    const loginUserWithEmailAndPassword = async (email, password) => {
        try {
            return await signInWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            console.error("Error logging in user:", error);
            throw error;
        }
    };

    const addUser = async (uid, data) => {
        try {
            data['uid'] = uid;
            await set(ref(database, `users/${uid}`), data);
        } catch (error) {
            console.error("Error adding user:", error);
            throw error;
        }
    };

    const addMovie = async (data, moviePoster) => {
        try {
            const moviesRef = push(ref(database, 'movies'));
            const movieId = moviesRef.key;
            data['movieId'] = movieId;
            await set(ref(database, `movies/${movieId}`), data);
            const posterRef = storageRef(storage, `moviePosters/${movieId}`);
            await uploadBytes(posterRef, moviePoster);
        } catch (error) {
            console.error("Error adding movie:", error);
            throw error;
        }
    };

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

    const fetchMoviePoster = async (posterPath) => {
        try {
            const posterRef = storageRef(storage, `moviePosters/${posterPath}`);
            return await getStorageDownloadURL(posterRef);
        } catch (error) {
            console.error("Error fetching poster:", error);
            return null;
        }
    };  
    
    const fetchUserDetails = async (userId) => {
        try {
            const snapshot = await get(ref(database, "users"));
            const userData = snapshot.val();
            
            if (userData) {
                const userArray = Object.values(userData);
                console.log(userArray)
                const user = userArray.find(user => user.uid === userId);
                return user ? user : "User not found";
            } else {
                return "No users found";
            }
        } catch (error) {
            console.error("Error fetching userData:", error);
            throw error;
        }
    };    

    return (
        <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, loginUserWithEmailAndPassword, addUser, addMovie, fetchAllMovies, fetchMoviePoster, fetchUserDetails }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};