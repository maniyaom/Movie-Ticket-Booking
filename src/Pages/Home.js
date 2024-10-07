import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/firebase";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Footer from "../components/Footer";
import Search from "../components/Search";

const Home = () => {
  const firebase = useFirebase();
  const [allMovies, setAllMovies] = useState([]);
  const [posterPaths, setPosterPaths] = useState({});
  const [sortType, setSortType] = useState("recent");

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  const sortMovies = (movies) => {
    console.log("Sort Clicked", sortType);
    let sortedMovies = [...movies];

    if (sortType === "avgRating") {
      const moviesWithAverageRatings = sortedMovies.map((movie) => {
        const ratingsArray = Object.values(movie.rating);
        const averageRating =
          ratingsArray.reduce((acc, curr) => acc + curr, 0) /
          ratingsArray.length;
        return { ...movie, averageRating };
      });

      sortedMovies = moviesWithAverageRatings.sort(
        (a, b) => b.averageRating - a.averageRating
      );
    } else if (sortType === "totalVotes") {
      const moviesWithHighestVoteCount = sortedMovies.map((movie) => {
        const ratingsArray = Object.values(movie.rating);
        const votes = ratingsArray.length;
        return { ...movie, votes };
      });

      sortedMovies = moviesWithHighestVoteCount.sort(
        (a, b) => b.votes - a.votes
      );
    } else if (sortType === "recent") {
      sortedMovies = sortedMovies.sort((a, b) => {
        const dateA = new Date(a.movieReleaseDate);
        const dateB = new Date(b.movieReleaseDate);
        return dateB - dateA;
      });
    }

    setAllMovies(sortedMovies);
  };

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/Login");
    }
  });

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await firebase.fetchAllMovies();
        console.log(movies);

        sortMovies(movies);

        // Fetch poster paths for all movies
        const paths = await Promise.all(
          movies.map((movie) => firebase.fetchMoviePoster(movie.movieId))
        );

        // Create an object with movie IDs as keys and poster paths as values
        const posterPathsObj = {};
        movies.forEach((movie, index) => {
          posterPathsObj[movie.movieId] = paths[index];
        });
        setPosterPaths(posterPathsObj);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    document.title = "Home - Book My Show";
    fetchMovies();
  }, [sortType]);

  return (
    <>
      <div className="search-sort-container">
        <Search movies={allMovies} />
        <select
          onChange={(e) => {
            setSortType(e.target.value); // This will set the selected value to the state
          }}
        >
          <option value="recent">Latest Release</option>
          <option value="totalVotes">Total Votes</option>
          <option value="avgRating">Average Rating</option>
        </select>
      </div>

      <div className="poster-container">
        {allMovies.map((movie, index) => {
          const { movieReleaseDate, movieTitle, movieGenre, movieId } = movie;
          const posterPath = posterPaths[movie.movieId];
          return (
            <Link to={"/MovieDetails/" + movieId} key={index}>
              <div className="poster">
                <div
                  className="placeholder shimmer"
                  style={{ width: "222px", height: "340px" }}
                >
                  <style>
                    {`
                      .shimmer::before {
                        content: "";
                        position: absolute;
                        background: linear-gradient(
                          90deg,
                          rgba(255, 255, 255, 0) 0%,
                          rgba(255, 255, 255, 0.4) 50%,
                          rgba(255, 255, 255, 0) 100%
                        );
                        height: 100%;
                        width: 100%;
                        animation: shimmer 1s infinite;
                        ${isImageLoaded ? "z-index: -1;" : ""}
                       }
                     `}
                  </style>
                  <div className="faux-image-wrapper">
                    <div className="faux-image">
                      <img src={posterPath} onLoad={handleImageLoad} />
                    </div>
                  </div>
                </div>
                <div className="timestamp myt-10" style={{ fontWeight: 500 }}>
                  {movieReleaseDate}
                </div>
                <div className="movie-name myt-5" style={{ fontWeight: 600 }}>
                  {movieTitle}
                </div>
                <div
                  className="movie-genre myt-5"
                  style={{ opacity: 0.8, fontSize: 15 }}
                >
                  {movieGenre}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default Home;
