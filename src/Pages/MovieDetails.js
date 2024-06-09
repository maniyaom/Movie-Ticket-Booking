import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import "./MovieDetails.css";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const movieId = useParams();

  const firebase = useFirebase();
  const [movieDetails, setMovieDetails] = useState();
  const [moviePosterUrl, setMoviePosterUrl] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const x = await firebase.fetchMovieDetails(movieId.movieId);
        const y = await firebase.fetchMoviePoster(movieId.movieId);
        setMovieDetails(x);
        setMoviePosterUrl(y);
        console.log("Movide Details : ", x);
      }
      catch (error) {

      }
    }
    fetchMovie();
  },[movieId.movieId]);

  if (!movieDetails && !moviePosterUrl) {
    return <p>Loading movie details...</p>;
  }

  return (
    <>
      <Navbar />

      <div className="main-div">
        <div className="container">
          <div className="row" style={{ width: "50rem" }}>
            <img src={moviePosterUrl} className="poster" />
            <div className="column">
              <h2 name="title" className="text">
                {movieDetails.movieTitle}
              </h2>

              <div className="row rating">
                <p className="text">8.7/10</p>
                <button type="button" className="rate">
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

              <button type="button" className="book">
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="column" style={{ backgroundColor: 'white' }}>
        <div style={{ color: "black", marginLeft: '13.5rem', marginTop: '1.5rem', marginRight: '13.5rem' }}>
          <h3>About the movie</h3>
          <p>{movieDetails.aboutMovie}</p>
          <br></br>
          <hr style={{ color: 'skyblue', opacity: 0.3 }}></hr>
          <br></br>
          <h3>Cast</h3>
          <p>{movieDetails.movieCast}</p>
        </div>

      </div>
    </>
  );
};

export default MovieDetails;