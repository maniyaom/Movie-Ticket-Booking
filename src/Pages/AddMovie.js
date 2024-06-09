import React, { useState, useEffect } from "react";
import './utils.css';
import Navbar from "../Components/Navbar";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import loader_icon from "../assets/icons/loader_icon.gif";

const AddMovie = () => {
    const firebase = useFirebase();
    const auth = getAuth();
    const navigate = useNavigate();

    const [isAdmin, setIsAdmin] = useState(false);
    const [creatorId, setCreatorId] = useState("");

    const [movieTitle, setMovieTitle] = useState("");
    const [movieLanguage, setMovieLanguage] = useState("");
    const [moviePoster, setMoviePoster] = useState(null);
    const [movieDuration, setMovieDuration] = useState("");
    const [movieGenre, setMovieGenre] = useState("");
    const [movieReleaseDate, setMovieReleaseDate] = useState("");
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
                        setCreatorId(uid);
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
            if (isAdmin == true){
                await firebase.addMovie({ movieTitle, movieLanguage, movieDuration, movieGenre, movieReleaseDate, aboutMovie, movieCast, ticketPrice, creatorId }, moviePoster);
            }
            else{
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

    return (
        <>
            <Navbar />
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