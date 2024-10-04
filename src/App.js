import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import SeatSelection from './components/SeatSelection';
import BookingForm from './components/BookingForm';
import ConfirmationModal from './components/ConfirmationModal';
import { fetchMovies, fetchSeats, makeBooking } from './api';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [seats, setSeats] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const movies = await fetchMovies();
        setMovies(movies);
      } catch (err) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  const handleMovieSelect = async (movieId) => {
    setSelectedMovie(movieId);
    try {
      setLoading(true);
      const seats = await fetchSeats(movieId);
      setSeats(seats);
    } catch (err) {
      setError('Failed to load seats');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (bookingData) => {
    try {
      setLoading(true);
      const confirmation = await makeBooking(bookingData);
      setBookingDetails(confirmation);
    } catch (err) {
      setError('Booking failed. Try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <MovieList movies={movies} onMovieSelect={handleMovieSelect} />

      {selectedMovie && (
        <SeatSelection seats={seats} onBooking={handleBooking} />
      )}

      {bookingDetails && (
        <ConfirmationModal bookingDetails={bookingDetails} />
      )}
    </div>
  );
};

export default App;
