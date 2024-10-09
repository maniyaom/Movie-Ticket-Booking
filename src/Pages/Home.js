import React, { useState, useEffect } from 'react';
import { useFirebase } from "../context/firebase";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from '../components/Footer';
import Search from '../components/Search';

const Home = () => {
  const firebase = useFirebase();
  const [allMovies, setAllMovies] = useState([]);
  const [posterPaths, setPosterPaths] = useState({});
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  // Redirect to login if user is not authenticated
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/Login");
    }
  });

  // Check for theme preference in local storage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // Fetch movies and their poster paths
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await firebase.fetchAllMovies();
        setAllMovies(movies);
        
        // Fetch poster paths for all movies
        const paths = await Promise.all(movies.map(movie => firebase.fetchMoviePoster(movie.movieId)));
        const posterPathsObj = {};
        movies.forEach((movie, index) => {
          posterPathsObj[movie.movieId] = paths[index];
        });
        setPosterPaths(posterPathsObj);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    document.title = 'Home - Book My Show';
    fetchMovies();
  }, [firebase]);

  return (
    <div className='dark:bg-slate-900 dark:text-white'>
      <div className='pt-[7vh] grid place-items-center'>
        <Search movies={allMovies} />
      </div>

      <div className={`flex flex-wrap justify-start mt-10 w-[90vw] mx-auto`}>
        {allMovies.map((movie, index) => {
          const { movieReleaseDate, movieTitle, movieGenre, movieId } = movie;
          const posterPath = posterPaths[movie.movieId];
          return (
            <Link to={`/MovieDetails/${movieId}`} key={index} className="mr-10 mb-7">
              <div className="w-[222px]">
                <div className={`relative placeholder w-[222px] h-[340px] overflow-hidden`}>
                  {!isImageLoaded && (
                    <div className={`shimmer absolute top-0 left-0 h-full w-full`}>
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
                          }
                        `}
                      </style>
                    </div>
                  )}
                  <div className="faux-image-wrapper pb-[100%] mb-2">
                    <div className="faux-image rounded-md h-full w-full">
                      <img
                        src={posterPath}
                        className="w-[222px] h-[340px] rounded-md"
                        onLoad={handleImageLoad}
                      />
                    </div>
                  </div>
                </div>
                <div className="my-2 font-medium">{movieReleaseDate}</div>
                <div className="my-1 font-semibold">{movieTitle}</div>
                <div className="my-1 text-sm opacity-80">{movieGenre}</div>
              </div>
            </Link>
          );
        })}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
