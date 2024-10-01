import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref, push, get } from "firebase/database";
import { getDownloadURL as getStorageDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    databaseUrl: process.env.REACT_APP_DATABASE_URL
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

    const fetchMovieDetails = async (movieId) => {
        try {
            const snapshot = await get(ref(database, "movies"));
            const movieData = snapshot.val();

            if (movieData) {
                const movieArray = Object.values(movieData);
                const movie = movieArray.find(movie => movie.movieId === movieId);
                return movie ? movie : "Movie not found";
            } else {
                return "No movie found";
            }
        } catch (error) {
            console.log("Error fetching movie details : ", error);
            throw error;
        }
    };

    const updateData = async (path, newValue) => {
        try {
            await set(ref(database, path), newValue);
            return "Data Updated successfully";
        } catch (error) {
            console.error("Error updating database : ", error);
            throw error;
        }
    };

    const makePayment = async (subtotal, updatedSeats, seatList, movieDetails, userData) => {

        const now = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[now.getMonth()];
        const day = String(now.getDate()).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const formattedTime = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;

        try {
            const ticketRef = push(ref(database, 'tickets'));
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
                subtotal: subtotal
            }
            await updateData(`movies/${movieDetails.movieId}/theaterSeats`, updatedSeats);
            await updateData(`users/${userData.uid}/wallet`, userData.wallet - subtotal);
            const creatorData = await fetchUserDetails(movieDetails.creatorId);
            await updateData(`users/${movieDetails.creatorId}/wallet`, creatorData.wallet + subtotal);

            await set(ref(database, `tickets/${ticketId}`), data);
        }
        catch (error) {
            console.error("Transaction Failed !!", error);
            throw error;
        }
    }

    const fetchTransactionDetails = async (uid) => {
        console.log("fetch transaction data : ", uid);
        try {
            const snapshot = await get(ref(database, "tickets"));
            const ticketsData = snapshot.val();

            if (!ticketsData) {
                console.log("No tickets data found.");
                return [];
            }

            const ticketArray = Object.values(ticketsData);

            // Filter the tickets where uid matches either paidBy or receivedBy
            const paid = ticketArray.filter(ticket => uid == ticket.paidBy);
            const received = ticketArray.filter(ticket => uid == ticket.receivedBy);

            return [...paid, ...received];

        } catch (error) {
            console.error("Error fetching tickets : ", error);
            throw error;
        }
    }

    const fetchTicketDetails = async (ticketId) => {
        try {
            const snapshot = await get(ref(database, "tickets"));
            const ticketData = snapshot.val();

            if (ticketData) {
                const ticketArray = Object.values(ticketData);
                const ticket = ticketArray.find(ticket => ticket.ticketId === ticketId);
                return ticket ? ticket : "Ticket not found";
            } else {
                return "No tickets found";
            }
        } catch (error) {
            console.error("Error fetching ticket data : ", error);
            throw error;
        }
    }


    return (
        <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, loginUserWithEmailAndPassword, addUser, addMovie, fetchAllMovies, fetchMoviePoster, fetchUserDetails, fetchMovieDetails, updateData, makePayment, fetchTransactionDetails, fetchTicketDetails }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};