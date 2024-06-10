import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { useParams, Link } from "react-router-dom";
import "./MovieDetails.css";
import star from "../assets/icons/star.png"


const MovieDetails = () => {
  const movieId = useParams();

  const firebase = useFirebase();
  const auth = getAuth();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [moviePosterUrl, setMoviePosterUrl] = useState("");

  const handleRateNowBtn = async () => {
    const rating = 7.2;
    await firebase.updateData(`movies/${movieDetails.movieId}/rating/${userDetails.uid}`,rating);
  }

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const x = await firebase.fetchMovieDetails(movieId.movieId);
        const y = await firebase.fetchMoviePoster(movieId.movieId);
        setMovieDetails(x);
        setMoviePosterUrl(y);
      }
      catch (error) {
        console.log("Error : ", error);
      }
    }

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDetails = await firebase.fetchUserDetails(user.uid);
        setUserDetails(userDetails);
      } else {
        navigate("/Login");
      }
    });

    fetchMovie();
  }, [movieId.movieId]);

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
                  <p className="text">8.7/10</p>
                </div>
                <button type="button" className="rate" onClick={handleRateNowBtn}>
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
    </>
  );
};

export default MovieDetails;