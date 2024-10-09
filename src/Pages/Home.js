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
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const navigate = useNavigate();
  const auth = getAuth();

  const genres = ["All", "Horror", "Comedy", "Adventure", "Action", "Drama"]; 

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

  // Filter movies based on selected genre
  const filterMoviesByGenre = (genre) => {
    setSelectedGenre(genre);
    if (genre === "All") {
      setFilteredMovies(allMovies);
    } else {
      const filtered = allMovies.filter(movie => movie.movieGenre.toLowerCase().includes(genre.toLowerCase()));
      setFilteredMovies(filtered);
    }
  }


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await firebase.fetchAllMovies();
        setAllMovies(movies);
        setFilteredMovies(movies); // Initialize with all movies
        // Fetch poster paths for all movies
        const paths = await Promise.all(movies.map(movie => firebase.fetchMoviePoster(movie.movieId)));
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

    document.title = 'Home - Book My Show';
    fetchMovies();
  }, []);

  return (
    <div className='dark:bg-slate-900'>
      <div className='pt-[7vh] grid place-items-center'>
        <Search movies={allMovies} />
      </div>

      {/* Genre Filter Buttons */}
      <div className="flex justify-center my-5 ">
        {genres.map((genre, index) => (
          <button
            key={index}
            className={`px-5 py-2 mx-2 rounded-full bg-gray-300 cursor-pointer transition-colors duration-300 font-semibold 
              ${selectedGenre === genre ? 'bg-red-500 text-white' : 'hover:bg-gray-400'}`}
            onClick={() => filterMoviesByGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>


      <div className={`flex flex-wrap justify-start mt-10 w-[90vw] mx-auto  dark:text-white`}>
        {filteredMovies.map((movie, index) => {
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
