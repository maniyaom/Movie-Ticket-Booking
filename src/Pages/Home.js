import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useFirebase } from "../context/firebase";
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from '../components/Footer';

const Home = () => {
  const firebase = useFirebase();
  const [allMovies, setAllMovies] = useState([]);
  const [posterPaths, setPosterPaths] = useState({});
  const [sortCriteria, setSortCriteria] = useState('releaseDate');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  const dropdownRef = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/Login");
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const movies = await firebase.fetchAllMovies();
        setAllMovies(movies);
        const paths = await Promise.all(movies.map(movie => firebase.fetchMoviePoster(movie.movieId)));
        const posterPathsObj = Object.fromEntries(movies.map((movie, index) => [movie.movieId, paths[index]]));
        setPosterPaths(posterPathsObj);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    document.title = 'Home - Book My Show';
    fetchMovies();
  }, [firebase]);

  const sortedMovies = useMemo(() => {
    const moviesCopy = [...allMovies];
    return moviesCopy.sort((a, b) => {
      switch (sortCriteria) {
        case 'rating':
          const aRating = a.rating ? Object.values(a.rating).reduce((sum, rate) => sum + rate, 0) / Object.keys(a.rating).length : 0;
          const bRating = b.rating ? Object.values(b.rating).reduce((sum, rate) => sum + rate, 0) / Object.keys(b.rating).length : 0;
          return bRating - aRating;
        case 'totalVotes':
          return (b.rating ? Object.keys(b.rating).length : 0) - (a.rating ? Object.keys(a.rating).length : 0);
        case 'releaseDate':
        default:
          return new Date(b.movieReleaseDate) - new Date(a.movieReleaseDate);
      }
    });
  }, [allMovies, sortCriteria]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    setIsOpen(false); // Close dropdown on sort change
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatSortCriteria = (criteria) => 
    criteria.charAt(0).toUpperCase() + criteria.slice(1).replace(/([A-Z])/g, ' $1');

  return (
    <>
      <div className="sort-container" ref={dropdownRef}>
        <label htmlFor="sort" className="sort-label">Sort by:</label>
        <div className="dropdown">
          <summary className="sort-select" id="sort" onClick={toggleDropdown}>
            {formatSortCriteria(sortCriteria)}
          </summary>
          {isOpen && (
            <ul className="dropdown-options">
              {['releaseDate', 'rating', 'totalVotes'].map(criteria => (
                <li key={criteria} onClick={() => handleSortChange(criteria)}>
                  {formatSortCriteria(criteria)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {loading ? (
        <div>Loading movies...</div>
      ) : (
        <div className="poster-container">
          {sortedMovies.map(({ movieReleaseDate, movieTitle, movieGenre, movieId }) => (
            <Link to={`/MovieDetails/${movieId}`} key={movieId}>
              <div className="poster">
                <div className="placeholder shimmer" style={{ width: '222px', height: '340px' }}>
                  <div className="faux-image-wrapper">
                    <div className="faux-image">
                      <img src={posterPaths[movieId]} alt={movieTitle} />
                    </div>
                  </div>
                </div>
                <div className="timestamp myt-10" style={{ fontWeight: 500 }}>{movieReleaseDate}</div>
                <div className="movie-name myt-5" style={{ fontWeight: 600 }}>{movieTitle}</div>
                <div className="movie-genre myt-5" style={{ opacity: 0.8, fontSize: 15 }}>{movieGenre}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Footer />
    </>
  );
};

export default Home;
