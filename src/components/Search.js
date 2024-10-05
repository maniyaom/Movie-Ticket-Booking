import React, { useEffect, useState } from 'react';
import './Search.css';
import { useNavigate } from 'react-router-dom';

export default function Search({ movies, posterPaths }) {
    const navigate = useNavigate()
    const [searchVal, setSearchVal] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);

    const handleSearchVal = (e) => {
        setSearchVal(e.target.value);
    };

    useEffect(() => {
        const filtered = movies.filter(movie => 
            movie?.movieTitle?.toLowerCase().includes(searchVal.toLowerCase())
        );
        setFilteredMovies(filtered);
    }, [searchVal, movies]);

    return (
        <div className='search-wrapper'>
            <div className='search-input'>
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
                                    <img 
                                        src={posterPaths[movie.movieId]} // Use movieId for poster path
                                        alt={movie.movieTitle} 
                                        className='image' 
                                    />
                                    <p className='title'>{movie.movieTitle}</p>
                                </div>
                            ))):
                            (<p className='no-search-suggestion'>No movies found matching your search.</p>)
                        }
                    </div>
                )
            }
        </div>
    );
}
