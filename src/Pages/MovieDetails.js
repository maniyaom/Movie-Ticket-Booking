import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { useParams, Link } from "react-router-dom";
import "./MovieDetails.css";
import star from "../assets/icons/star.png";
import closeIcon from "../assets/icons/close-icon.png";

const MovieDetails = () => {
  const movieId = useParams();

  const firebase = useFirebase();
  const auth = getAuth();
  const navigate = useNavigate();

  const [rating, setRating] = useState(3);
  const [averageRating, setAverageRating] = useState(0);
  const [showRatingPopup, setShowRatingPopup] = useState(false);

  const [userDetails, setUserDetails] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [moviePosterUrl, setMoviePosterUrl] = useState("");

  const submitRating = async () => {
    await firebase.updateData(
      `movies/${movieDetails.movieId}/rating/${userDetails.uid}`,
      rating
    );
    setShowRatingPopup(false);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const x = await firebase.fetchMovieDetails(movieId.movieId);
        const y = await firebase.fetchMoviePoster(movieId.movieId);
        setMovieDetails(x);
        setMoviePosterUrl(y);
        if (x.rating) {
          let totalRating = 0;
          Object.entries(x.rating).forEach(([key, value]) => {
            totalRating += value;
          });
          setAverageRating((totalRating / Object.keys(x.rating).length).toFixed(2) + '/5.0 (' + Object.keys(x.rating).length + ' Votes)');
        }
        else {
          setAverageRating("0.0/5.0 (0 Votes)");
        }
      } catch (error) {
        console.log("Error : ", error);
      }
    };

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDetails = await firebase.fetchUserDetails(user.uid);
        setUserDetails(userDetails);
      } else {
        navigate("/Login");
      }
    });

    fetchMovie();
  }, [auth, showRatingPopup]);

  // Remove showRatingPopup to reduce page reload rate

  if (!movieDetails || !moviePosterUrl || !userDetails) {
    return <p>Loading movie details...</p>;
  }

  return (
    <>
      <div className="main-div">
        <div className="container">
          <div className="row" style={{ width: "50rem" }}>
            <img src={moviePosterUrl} className="poster" />
            <div className="column">
              <h2 name="title" className="text">
                {movieDetails.movieTitle}
              </h2>

              <div className="row rating">
                <div className="flex align-center" style={{ marginLeft: '20px' }}>
                  <img src={star} />
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
                <div name="Duration" className="text">
                  {movieDetails.movieDuration}
                </div>
                <span className="text"> • </span>
                <div name="Genre" className="text">
                  {movieDetails.movieGenre}
                </div>
                <span className="text"> • </span>
                <div name="Date" className="text">
                  {movieDetails.movieReleaseDate}
                </div>
              </div>

              <Link to={'/BookTicket/' + movieId.movieId} className="book">Book Tickets</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="column" style={{ backgroundColor: 'white' }}>
        <div style={{ color: "black", marginLeft: '13.5rem', marginTop: '1.5rem', marginRight: '13.5rem' }}>
          <h3 style={{ marginBottom: '5px' }}>About the movie</h3>
          <p>{movieDetails.aboutMovie}</p>
          <br></br>
          <hr style={{ color: 'skyblue', opacity: 0.3 }}></hr>
          <br></br>
          <h3 style={{ marginBottom: '5px' }}>Cast</h3>
          <p>{movieDetails.movieCast}</p>
        </div>
      </div>

      <div className={showRatingPopup ? "toggle-popup" : "hide-div"}>
        <div className="rating-container">
          <img src={closeIcon} className="close-icon" onClick={() => setShowRatingPopup(false)} />
          <span className="rate-popup-title">Rate Movie</span>
          <div className="rating-popup">
            <input
              value="5"
              name="rate"
              id="star5"
              type="radio"
              checked={rating == 5}
              onChange={() => setRating(5)}
            />
            <label title="text" htmlFor="star5"></label>
            <input
              value="4"
              name="rate"
              id="star4"
              type="radio"
              checked={rating == 4}
              onChange={() => setRating(4)}
            />
            <label title="text" htmlFor="star4"></label>
            <input
              value="3"
              name="rate"
              id="star3"
              type="radio"
              checked={rating == 3}
              onChange={() => setRating(3)}
            />
            <label title="text" htmlFor="star3"></label>
            <input
              value="2"
              name="rate"
              id="star2"
              type="radio"
              checked={rating == 2}
              onChange={() => setRating(2)}
            />
            <label title="text" htmlFor="star2"></label>
            <input
              value="1"
              name="rate"
              id="star1"
              type="radio"
              checked={rating == 1}
              onChange={() => setRating(1)}
            />
            <label title="text" htmlFor="star1"></label>
          </div>
          <button
            className="btn"
            style={{ width: "55%", margin: "30px 20%" }}
            onClick={submitRating}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
