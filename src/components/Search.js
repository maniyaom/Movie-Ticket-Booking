import React, { useEffect, useState } from 'react';
import './Search.css';
import { useNavigate } from 'react-router-dom';

export default function Search({ movies}) {
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
        const filtered = movies.filter(movie =>
            movie?.movieTitle?.toLowerCase().includes(debouncedSearchVal.toLowerCase())
        );
        setFilteredMovies(filtered);
    }, [debouncedSearchVal, movies]);

    return (
        <div className='search-wrapper'>
            <div
                className='search-input'
            >
                <input
                    type="text"
                    placeholder='Search here...'
                    value={searchVal}
                    onChange={handleSearchVal}
                />
            </div>
            {
                searchVal.trim() !== "" && (
                    <div className='search-suggestion'>
                        {filteredMovies.length ?
                            (filteredMovies.map(movie => (
                                <div key={movie.movieId} className='suggestion-item' onClick={() => navigate(`/MovieDetails/${movie.movieId}`)}>
                                    <p className='title'>{movie.movieTitle}</p>
                                </div>
                            ))) :
                            (<p className='no-search-suggestion'>No movies found matching your search.</p>)
                        }
                    </div>
                )
            }
        </div>
    );
}
