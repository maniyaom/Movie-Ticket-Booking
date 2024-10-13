import React, { useEffect, useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

export default function Search({ totalMovies }) {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [debouncedSearchVal, setDebouncedSearchVal] = useState(searchVal);

  const handleSearchVal = (e) => {
    setSearchVal(e.target.value);
  };

  // Debouncing logic: Updates debouncedSearchVal after a delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchVal(searchVal);
    }, 700); // Adjust the delay as needed (1000ms here)

    // Cleanup function to clear timeout if the component re-renders before the delay ends
    return () => {
      clearTimeout(handler);
    };
  }, [searchVal]);

  useEffect(() => {
    const filtered = totalMovies.filter((movie) =>
      movie?.movieTitle
        ?.toLowerCase()
        .includes(debouncedSearchVal.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [debouncedSearchVal, totalMovies]);

  return (
    <div className="search-wrapper">
      <div className="search-input">
        <input
          type="text"
          placeholder="Search here..."
          value={searchVal}
          onChange={handleSearchVal}
        />
      </div>
      <button className="search-btn">
        <CiSearch />
      </button>
      {searchVal.trim() !== "" && (
        <div className="search-suggestion">
          {filteredMovies.length ? (
            filteredMovies.map((movie) => (
              <div
                key={movie.movieId}
                className="suggestion-item"
                onClick={() => {
                  navigate(`/MovieDetails/${movie.movieId}`);

                  //setSearchVal to "" to avoid suggestions after clicking
                  setSearchVal("");
                }}
              >
                <p className="title">{movie.movieTitle}</p>
              </div>
            ))
          ) : (
            <p className="no-search-suggestion">
              No movies found matching your search.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
