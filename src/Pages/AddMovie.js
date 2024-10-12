import React, { useState, useEffect } from "react";
import './utils.css';
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import loader_icon from "../assets/icons/loader_icon.gif";
import '../components/Navbar.css';
import Footer from '../components/Footer';

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
    // Predefined show times
    const showTimes = ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM'];

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

    const [movieTitleError, setMovieTitleError] = useState("");
    const [movieLanguageError, setMovieLanguageError] = useState("");
    const [moviePosterError, setMoviePosterError] = useState(null);
    const [movieDurationError, setMovieDurationError] = useState("");
    const [movieGenreError, setMovieGenreError] = useState("");
    const [movieReleaseDateError, setMovieReleaseDateError] = useState("");
    const [movieTimingError, setMovieTimingError] = useState("");
    const [aboutMovieError, setAboutMovieError] = useState("");
    const [movieCastError, setMovieCastError] = useState("");
    const [ticketPriceError, setTicketPriceError] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    
    const [error, setError] = useState("");

    function convertDate(releaseDate) {
        let date = releaseDate.split('-');
        
        let month = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
        releaseDate = date[2] + ' ' + month[date[1]-1] + ' ' + date[0]
        return releaseDate;
    }
    
    const convertTo24HourFormat = (time12h) => {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');

        if (hours === '12') {
        hours = modifier === 'AM' ? '00' : '12';
        } else {
        hours = modifier === 'PM' ? String(parseInt(hours, 10) + 12).padStart(2, '0') : hours;
        }

        return `${hours}:${minutes}`;
    };
    
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
        if (validateForm() == true){
            try {
                const [hours, minutes,seconds] = movieDuration.split(':');
                const formattedMovieDuration = `${hours}h ${minutes}m ${seconds}s`;
                const releaseDate = convertDate(movieReleaseDate);
                console.log(releaseDate)
    
                const movieTiming12hrs = convertTo12Hour(movieTiming);
                if (isAdmin == true) {
                    await firebase.addMovie({ movieTitle, movieLanguage, movieDuration: formattedMovieDuration, movieGenre, movieReleaseDate: releaseDate, aboutMovie, movieCast, ticketPrice, movieTiming: movieTiming12hrs, theaterSeats, theaterName, theaterAddress, creatorId }, moviePoster);

                    clearForm();
                    alert("Movie Added Successfully.");
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
        else{
            setIsLoading(false);
        }
    }

    const handlePosterChange = (e) => {
        const file = e.target.files[0];
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif']; // List of valid image types

        if (file && validImageTypes.includes(file.type)) {
            // Clear any previous errors
            setMoviePosterError('');
            // Proceed with the valid image file
            setMoviePoster(file);
        } else {
            // Set an error if the file is not a valid image
            setMoviePosterError('Please upload a valid image (JPEG, PNG, or GIF).');
            setMoviePoster(null); // Reset the movie poster value
        }
    };

    const validateForm = () => {
        let isValid = true;
        if (movieTitle == ""){
            setMovieTitleError("(Required Field)");
            isValid = false;
        }
        if (movieLanguage == ""){
            setMovieLanguageError("(Required Field)");
            isValid = false;
        }
        if (movieDuration == ""){
            setMovieDurationError("(Required Field)");
            isValid = false;
        }
        if (movieGenre == ""){
            setMovieGenreError("(Required Field)");
            isValid = false;
        }
        if (movieReleaseDate == ""){
            setMovieReleaseDateError("(Required Field)");
            isValid = false;
        }
        if (movieTiming == ""){
            setMovieTimingError("(Required Field)");
            isValid = false;
        }
        if (aboutMovie == ""){
            setAboutMovieError("(Required Field)");
            isValid = false;
        }
        if (movieCast == ""){
            setMovieCastError("(Required Field)");
            isValid = false;
        }
        if (ticketPrice == ""){
            setTicketPriceError("(Required Field)");
            isValid = false;
        }
        if(!moviePoster){
            if(moviePosterError==null)
            setMoviePosterError("Poster is Required");
            isValid = false;
        }
        return isValid;
    }

    const clearForm = () => {
        setMovieTitle("");
        setMovieLanguage("");
        setMovieDuration("");
        setMovieGenre("");
        setMovieReleaseDate("");
        setMovieTiming("");
        setAboutMovie("");
        setMovieCast("");
        setTicketPrice("");
        setError("");
        setMoviePoster(null);
    }

    const handleTimeClick = (time) => {
        const convertedTime = convertTo24HourFormat(time); // Convert to 24-hour format
        setMovieTiming(convertedTime); // Set it in state
      };
    
    function handleMovieTextValidation(e){
        if(e.target.name.includes('title')){
            const value = e.target.value;
            const regex = /^[A-Za-z0-9 ,]+$/;  

            if (regex.test(value) || value === "") {
                setMovieTitle(value);  
                setMovieTitleError(""); 
            } else {
                setMovieTitleError("Only alphanumeric characters, commas, and spaces are allowed");
            }
        }
        if(e.target.name.includes('language')){
            const value = e.target.value;
            const regex = /^[A-Za-z ,]+$/;  

            if (regex.test(value) || value === "") {
                setMovieLanguage(value);  
                setMovieLanguageError(""); 
            } else {
                setMovieLanguageError("Only alphabetic characters, commas, and spaces are allowed");
            }
        }
        if(e.target.name.includes('cast')){
            const value = e.target.value;
            const regex = /^[A-Za-z ,]+$/;  

            if (regex.test(value) || value === "") {
                setMovieCast(value);  
                setMovieCastError(""); 
            } else {
                setMovieCastError("Only alphabetic characters, commas, and spaces are allowed");
            }
        }
        if(e.target.name.includes('genre')){
            const value = e.target.value;
            const regex = /^[A-Za-z ,\/]+$/;  

            if (regex.test(value) || value === "") {
                setMovieGenre(value);  
                setMovieGenreError(""); 
            } else {
                setMovieGenreError("Only alphabetic characters, commas, and spaces are allowed");
            }
        }
        if(e.target.name.includes('price')){
            const value = e.target.value;
            const regex = /^\d{1,4}$/;  

            if (regex.test(value) || value === "") {
                setTicketPrice(value);  
                setTicketPriceError(""); 
            } else {
                setTicketPriceError("Only numbers less than 10000 are allowed");
            }
        }
        if(e.target.name.includes('about')){
            const value = e.target.value;
            const regex = /^(?=.*[a-zA-Z]).*$/;  

            if (regex.test(value) || value === "") {
                setAboutMovie(value);  
                setAboutMovieError(""); 
            } else {
                setAboutMovieError("Enter atleast an alphabet");
            }
        }
        

    }
    if (!isAdmin)
        return <p>Loading...</p>

    return (
        <>
            <div className="flex justify-center align-center" style={{ marginTop: '5px',flexDirection:'column' }}>
            <div className="signup-heading text-center myb-10">List Your Movie</div>
            <div className="signup-subheading myb-20">
                Please provide movie name, language, poster.
            </div>
    <div className="signup-card add-movie flex" style={{width:'90%'}}>
        <div className="left-side-form"  >
            
            

            <label htmlFor="movie-title" className="label-text">
                Movie Title <span className="error-inline mxl-10">{movieTitleError}</span>
            </label>
            <input
                type="text"
                value={movieTitle}
                onChange={handleMovieTextValidation}
                className="input-field"
                placeholder="e.g. Sholay"
                name="movie-title"
            />

            <label htmlFor="movie-language" className="label-text">
                Movie Languages <span className="error-inline mxl-10">{movieLanguageError}</span>
            </label>
            <input
                type="text"
                value={movieLanguage}
                onChange={handleMovieTextValidation}
                placeholder="e.g. English"
                className="input-field"
                name="movie-language"
            />

            <label className="label-text">
                Movie Duration (HH:MM:SS) <span className="error-inline mxl-10">{movieDurationError}</span>
            </label>
            <input
                type="time"
                value={movieDuration}
                step ='2'
                onChange={(e) => setMovieDuration(e.target.value)}
                className="input-field"
            />

            <label htmlFor="movie-genre" className="label-text">
                Movie Genre <span className="error-inline mxl-10">{movieGenreError}</span>
            </label>
            <input
                type="text"
                value={movieGenre}
                onChange={handleMovieTextValidation}
                placeholder="e.g. Action/Horror"
                className="input-field"
                name="movie-genre"
            />
            <label className="label-text">
                Movie Release Date <span className="error-inline mxl-10">{movieReleaseDateError}</span>
            </label>
            <input
                type="date"
                value={movieReleaseDate}
                onChange={(e) => setMovieReleaseDate(e.target.value)}
                className="input-field"
            />
        </div>

        
        <div className="right-side-form">
            

            <label className="label-text">
                Show Time (HH:MM) <span className="error-inline mxl-10">{movieTimingError}</span>
            </label>
            {/* Predefined show time buttons */}
            <div className="predefined-times">
                {showTimes.map((time) => (
                <button 
                    key={time} 
                    onClick={() => handleTimeClick(time)} 
                    className={`btn-time input-field ${movieTiming === time ? 'selected' : ''}`}
                    style={{width:'20%',}}
                >
                    {time}
                </button>
                ))}
            </div>
            
            {/* Custom time input */}
            <div className="custom-time">
                <label className="label-text">Or enter custom time (HH:MM):</label>
                <input
                type="time"
                value={movieTiming.includes(':') ? movieTiming : ''}
                onChange={(e) => setMovieTiming(e.target.value)}
                className="input-field"
                />
            </div>
            
            <label htmlFor="about-movie" className="label-text">
                About Movie <span className="error-inline mxl-10">{aboutMovieError}</span>
            </label>
            <input
                type="text"
                value={aboutMovie}
                onChange={handleMovieTextValidation}
                placeholder="e.g. Description"
                className="input-field"
                name="about-movie"
            />

            <label htmlFor="movie-cast" className="label-text">
                Movie Cast <span className="error-inline mxl-10">{movieCastError}</span>
            </label>
            <input
                type="text"
                value={movieCast}
                onChange={handleMovieTextValidation}
                placeholder="e.g. Rajnikant, Amitabh Bachhan, etc."
                className="input-field"
                name="movie-cast"
            />

            <label htmlFor="ticket-price" className="label-text">
                Ticket Price (In Rs.) <span className="error-inline mxl-10">{ticketPriceError}</span>
            </label>
            <input
                type="text"
                value={ticketPrice}
                onChange={handleMovieTextValidation}
                placeholder="e.g. 250"
                className="input-field"
                name="ticket-price"
            />

            <label className="label-text">
                Poster <span className="error-inline mxl-10">{moviePosterError}</span>
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={handlePosterChange}
                required
            />

            <div className={isLoading ? 'show-loader' : 'hide-div'}>
                <img src={loader_icon} alt="Loader Icon" />
            </div>
            <span className="error">{error}</span>

            <button className="btn" onClick={handleSubmit}>Submit</button>
        </div>
    </div>
</div>

            <Footer />
        </>
    );
};

export default AddMovie;
