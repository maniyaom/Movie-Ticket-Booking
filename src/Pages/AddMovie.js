import React, { useState, useEffect } from "react";
import './utils.css';
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import loader_icon from "../assets/icons/loader_icon.gif";

function convertTo12Hour(time) {
    // Split the time into hours and minutes
    let [hours, minutes] = time.split(':').map(Number);

    // Determine AM or PM suffix
    let period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12 || 12;

    // Format the hours and minutes to always be two digits
    let formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;

    return formattedTime;
}

const AddMovie = () => {
    const firebase = useFirebase();
    const auth = getAuth();
    const navigate = useNavigate();
    const theaterSeats = new Array(11).fill(null).map(() => new Array(8).fill(false));

    const [isAdmin, setIsAdmin] = useState("");
    const [theaterName, setTheaterName] = useState("");
    const [theaterAddress, setTheaterAddress] = useState("");
    const [creatorId, setCreatorId] = useState("");

    const [movieTitle, setMovieTitle] = useState("");
    const [movieLanguage, setMovieLanguage] = useState("");
    const [moviePoster, setMoviePoster] = useState(null);
    const [movieDuration, setMovieDuration] = useState("");
    const [movieGenre, setMovieGenre] = useState("");
    const [movieReleaseDate, setMovieReleaseDate] = useState("");
    const [movieTiming, setMovieTiming] = useState("");
    const [aboutMovie, setAboutMovie] = useState("");
    const [movieCast, setMovieCast] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const getUserData = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                try {
                    const userDetails = await firebase.fetchUserDetails(uid);
                    if (userDetails.isAdmin == false) {
                        navigate('/Home');
                    }
                    else {
                        setIsAdmin(true);
                        setTheaterName(userDetails.theaterName);
                        setTheaterAddress(userDetails.theaterAddress);
                        setCreatorId(userDetails.uid);
                        console.log(userDetails)
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
            else {
                navigate("/Login")
            }
        });

        return () => getUserData();
    }, [auth]);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            console.log(theaterName);
            console.log(theaterAddress);

            const [hours, minutes] = movieDuration.split(':');
            const formattedMovieDuration = `${hours}h ${minutes}m`;

            const movieTiming12hrs = convertTo12Hour(movieTiming);
            if (isAdmin == true) {
                await firebase.addMovie({ movieTitle, movieLanguage, movieDuration: formattedMovieDuration, movieGenre, movieReleaseDate, aboutMovie, movieCast, ticketPrice, movieTiming12hrs, theaterSeats, theaterName, theaterAddress, creatorId }, moviePoster);
            }
            else {
                setError("Failed to add movie to the database");
            }
        } catch (error) {
            console.log("Failed to add movie data to the database:", error);
            setError("Failed to add movie data to the database");
        } finally {
            setIsLoading(false);
        }
    }

    const handlePosterChange = (e) => {
        setMoviePoster(e.target.files[0]);
    };

    if (!isAdmin)
        return <p>Loading...</p>

    return (
        <>
            <div className="flex justify-center align-center" style={{ marginTop: '70px' }}>
                <div className="signup-card">
                    <div className="signup-heading text-center myb-20">List Movie</div>
                    <div className="signup-subheading myb-20">
                        Please provide movie name, language, poster.
                    </div>

                    <label className="label-text">
                        Movie Title
                    </label>
                    <input
                        type="text"
                        value={movieTitle}
                        onChange={(e) => setMovieTitle(e.target.value)}
                        className="input-field"
                        placeholder="e.g. Sholay"
                    />

                    <label className="label-text">
                        Movie Languages
                    </label>
                    <input
                        type="text"
                        value={movieLanguage}
                        onChange={(e) => setMovieLanguage(e.target.value)}
                        placeholder="e.g. English"
                        className="input-field"
                    />

                    <label className="label-text">
                        Movie Duration (HH:MM)
                    </label>
                    <input
                        type="time"
                        value={movieDuration}
                        onChange={(e) => setMovieDuration(e.target.value)}
                        placeholder="e.g. 02:30"
                        className="input-field"
                    />

                    <label className="label-text">
                        Movie Genre
                    </label>
                    <input
                        type="text"
                        value={movieGenre}
                        onChange={(e) => setMovieGenre(e.target.value)}
                        placeholder="e.g. Action/Horror"
                        className="input-field"
                    />

                    <label className="label-text">
                        Movie Release Date
                    </label>
                    <input
                        type="date"
                        value={movieReleaseDate}
                        onChange={(e) => setMovieReleaseDate(e.target.value)}
                        placeholder="e.g. 6-10-2023"
                        className="input-field"
                    />

                    <label className="label-text">
                        Show Time (HH:MM)
                    </label>
                    <input
                        type="time"
                        value={movieTiming}
                        onChange={(e) => setMovieTiming(e.target.value)}
                        placeholder="e.g. 02:30"
                        className="input-field"
                    />

                    <label className="label-text">
                        About Movie
                    </label>
                    <input
                        type="text"
                        value={aboutMovie}
                        onChange={(e) => setAboutMovie(e.target.value)}
                        placeholder="e.g. Description"
                        className="input-field"
                    />

                    <label className="label-text">
                        Movie Cast
                    </label>
                    <input
                        type="text"
                        value={movieCast}
                        onChange={(e) => setMovieCast(e.target.value)}
                        placeholder="e.g. Rajnikant, Amitabh Bachhan, etc.."
                        className="input-field"
                    />

                    <label className="label-text">
                        Ticket Price (In Rs.)
                    </label>
                    <input
                        type="text"
                        value={ticketPrice}
                        onChange={(e) => setTicketPrice(e.target.value)}
                        placeholder="e.g. 250"
                        className="input-field"
                    />

                    <label className="label-text">
                        Poster
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePosterChange}
                    />
                    <div className={isLoading ? 'show-loader' : 'hide-div'}>
                        <img src={loader_icon} alt="Loader Icon" />
                    </div>
                    <span className="error">{error}</span>

                    <button className="btn" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default AddMovie;