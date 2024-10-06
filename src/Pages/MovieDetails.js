import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import "./MovieDetails.css";
import star from "../assets/icons/star.png";
import closeIcon from "../assets/icons/close-icon.png";
import Footer from '../components/Footer';

const MovieDetails = () => {
  const { movieId } = useParams(); // Correctly destructure movieId
  const firebase = useFirebase();
  const auth = getAuth();
  const navigate = useNavigate();

  const [rating, setRating] = useState(3);
  const [averageRating, setAverageRating] = useState("0.0/5.0 (0 Votes)");
  const [showRatingPopup, setShowRatingPopup] = useState(false);

  const [userDetails, setUserDetails] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [moviePosterUrl, setMoviePosterUrl] = useState("");

  const submitRating = async () => {
    await firebase.updateData(`movies/${movieDetails.movieId}/rating/${userDetails.uid}`, rating);
    fetchMovieDetails(); // Refetch movie details
    setShowRatingPopup(false);
  };

  const fetchMovieDetails = async () => {
    try {
      const movieData = await firebase.fetchMovieDetails(movieId);
      const posterUrl = await firebase.fetchMoviePoster(movieId);
      setMovieDetails(movieData);
      setMoviePosterUrl(posterUrl);
      if (movieData.rating) {
        let totalRating = 0;
        Object.entries(movieData.rating).forEach(([key, value]) => {
          totalRating += value;
        });
        setAverageRating((totalRating / Object.keys(movieData.rating).length).toFixed(2) + '/5.0 (' + Object.keys(movieData.rating).length + ' Votes)');
      }
    } catch (error) {
      console.log("Error fetching movie details:", error);
      setAverageRating("Error fetching rating");
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        await fetchMovieDetails(); // Fetch movie details on load
      } catch (error) {
        console.log("Error : ", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDetails = await firebase.fetchUserDetails(user.uid);
        setUserDetails(userDetails);
        fetchMovie();
      } else {
        navigate("/Login");
      }
    });

    return () => unsubscribe(); // Clean up subscription
  }, [auth]);

  if (!movieDetails || !moviePosterUrl || !userDetails) {
    return <p>Loading movie details...</p>;
  }

  return (
    <>
      <div className="main-div">
        <div className="container">
          <div className="row" style={{ width: "50rem" }}>
            <img src={moviePosterUrl} alt="Movie Poster" className="poster" />
            <div className="column">
              <h2 className="text">{movieDetails.movieTitle}</h2>
              <div className="row rating" style={{ width: '28rem' }}>
                <div className="flex align-center" style={{ marginLeft: '20px' }}>
                  <img src={star} alt="Star Icon" />
                  <p className="text">{averageRating}</p>
                </div>
                <button type="button" className="rate" onClick={() => setShowRatingPopup(true)}>
                  Rate Now
                </button>
              </div>
              <div className="language" style={{ marginBottom: '1rem' }}>
                <span>{movieDetails.movieLanguage}</span>
              </div>
              <div className="row">
                <div className="text">{movieDetails.movieDuration}</div>
                <span className="text"> • </span>
                <div className="text">{movieDetails.movieGenre}</div>
                <span className="text"> • </span>
                <div className="text">{movieDetails.movieReleaseDate}</div>
              </div>
              <Link to={`/BookTicket/${movieId}`} className="book">Book Tickets</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="column" style={{ backgroundColor: 'white' }}>
        <div style={{ color: "black", margin: '1.5rem 13.5rem' }}>
          <h3 style={{ marginBottom: '5px' }}>About the movie</h3>
          <p>{movieDetails.aboutMovie}</p>
          <br />
          <hr style={{ color: 'skyblue', opacity: 0.3 }} />
          <br />
          <h3 style={{ marginBottom: '5px' }}>Cast</h3>
          <p>{movieDetails.movieCast}</p>
        </div>
      </div>

      <div className={showRatingPopup ? "toggle-popup" : "hide-div"}>
        <div className="rating-container">
          <img src={closeIcon} alt="Close" className="close-icon" onClick={() => setShowRatingPopup(false)} />
          <span className="rate-popup-title">Rate Movie</span>
          <div className="rating-popup">
            {[5, 4, 3, 2, 1].map((value) => (
              <React.Fragment key={value}>
                <input
                  value={value}
                  name="rate"
                  id={`star${value}`}
                  type="radio"
                  checked={rating === value}
                  onChange={() => setRating(value)}
                />
                <label htmlFor={`star${value}`}>{value}</label>
              </React.Fragment>
            ))}
          </div>
          <button className="btn" style={{ width: "55%", margin: "30px 20%" }} onClick={submitRating}>
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieDetails;
