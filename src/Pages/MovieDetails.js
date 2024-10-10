import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { useParams, Link } from "react-router-dom";
import star from "../assets/icons/star.png";
import closeIcon from "../assets/icons/close-icon.png";
import Footer from '../components/Footer';

const MovieDetails = () => {
  const movieId = useParams();
  const firebase = useFirebase();
  const auth = getAuth();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [showRatingPopup, setShowRatingPopup] = useState(false);

  const [userDetails, setUserDetails] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [moviePosterUrl, setMoviePosterUrl] = useState("");

  const submitRating = async () => {
    await firebase.updateData(
      `movies/${movieDetails.movieId}/rating/${userDetails.uid}`,
      rating
    );
    setShowRatingPopup(false);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const x = await firebase.fetchMovieDetails(movieId.movieId);
        const y = await firebase.fetchMoviePoster(movieId.movieId);
        setMovieDetails(x);
        setMoviePosterUrl(y);
        if (x.rating) {
          let totalRating = 0;
          Object.entries(x.rating).forEach(([key, value]) => {
            totalRating += value;
          });
          setAverageRating((totalRating / Object.keys(x.rating).length).toFixed(2) + '/5.0 (' + Object.keys(x.rating).length + ' Votes)');
        } else {
          setAverageRating("0.0/5.0 (0 Votes)");
        }
      } catch (error) {
        console.log("Error : ", error);
      }
    };

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDetails = await firebase.fetchUserDetails(user.uid);
        setUserDetails(userDetails);
      } else {
        navigate("/Login");
      }
    });

    fetchMovie();
  }, [auth, showRatingPopup]);

  if (!movieDetails || !moviePosterUrl || !userDetails) {
    return <p>Loading movie details...</p>;
  }

  return (
    <>
    <div className="relative h-[55vh] bg-cover bg-center"  style={{ backgroundImage: `url(${require('../assets/images/background.jpg')})` }}>
      
      {/* Gradient Layer */}
      <div className="absolute inset-0 w-[90%] bg-gradient-to-r from-black/100 via-black/80  to-black/00"></div>
      <div className="absolute inset-y-0 right-0 w-[40%] bg-gradient-to-l from-black/100 via-black/40 to-black/0"></div>



      {/* Content Layer */}
      <div className="relative flex pt-[7vh]  ml-[30vh] w-[80%] h-[90%]">
        <img src={moviePosterUrl} className="object-fill w-56 h-90 mx-8  rounded-lg" alt="Movie Poster" />
        <div className="flex  flex-col justify-center">
          <h2 className="text-white font-bold text-2xl mb-2">{movieDetails.movieTitle}</h2>

          <div className="flex justify-between items-center h-16 w-[28rem] bg-gray-700 rounded-lg  px-4">
            <div className="flex items-center">
              <img src={star} className="w-8 h-8" alt="Star Icon" />
              <p className="text-white ml-3">{averageRating}</p>
            </div>
            <button 
              type="button" 
              className="bg-white text-black font-semibold w-28 h-10 rounded-lg" 
              onClick={() => setShowRatingPopup(true)}>
              Rate Now
            </button>
          </div>

          <div className="bg-white text-black max-w-max rounded-md py-1 mt-4 px-2 mb-4">
            {movieDetails.movieLanguage}
          </div>

          <div className="flex text-white">
            <span>{movieDetails.movieDuration}</span>
            <span className="mx-2">•</span>
            <span>{movieDetails.movieGenre}</span>
            <span className="mx-2">•</span>
            <span>{movieDetails.movieReleaseDate}</span>
          </div>

          <Link 
            to={`/BookTicket/${movieId.movieId}`} 
            className="bg-red-600 w-60 h-12 mt-8 flex justify-center items-center rounded-lg text-white font-semibold">
            Book Tickets
          </Link>
        </div>
      </div>
    </div>



      

      <div className="flex flex-col bg-white  dark:bg-slate-900 ">
        <div className="text-black mx-16 my-6 dark:text-white">
          <h3 className="text-lg font-bold mb-1">About the movie</h3>
          <p>{movieDetails.aboutMovie}</p>
          <br />
          <hr className="border-blue-300 opacity-30" />
          <br />
          <h3 className="text-lg font-bold mb-1">Cast</h3>
          <p>{movieDetails.movieCast}</p>
        </div>
      </div>

      <div className={showRatingPopup ? "fixed left-1/2 transform -translate-x-1/2 top-1/2 transform -translate-y-1/2 bg-white border-2 border-red-600 rounded-lg p-5 w-64" : "hidden"}>
      <div className="flex justify-between items-center mb-4">
        <img src={closeIcon} className="w-6 h-6 cursor-pointer" onClick={() => setShowRatingPopup(false)} alt="Close" />
        <span className="font-semibold text-xl text-red-600">Rate Movie</span>
      </div>
      <div className="flex items-center justify-center">
        {[1, 2, 3, 4, 5].map((starValue) => (
          <div
            key={starValue}
            className="flex items-center"
            onMouseEnter={() => setHoveredStar(starValue)} // Set hovered star on mouse enter
            onMouseLeave={() => setHoveredStar(0)} // Reset hovered star on mouse leave
          >
            <input
              value={starValue}
              name="rate"
              id={`star${starValue}`}
              type="radio"
              checked={rating === starValue} // Check if the rating matches the starValue
              onChange={() => setRating(starValue)} // Set rating on change
              className="hidden"
            />
            <label
              htmlFor={`star${starValue}`}
              className={`cursor-pointer text-2xl ${
                starValue <= (hoveredStar || rating) ? 'text-yellow-400' : 'text-gray-500'
              } hover:text-yellow-400`}
            >
              ★
            </label>
          </div>
        ))}
      </div>
      <button className="bg-red-600 text-white rounded-lg w-full mt-4 h-10" onClick={submitRating}>
        Submit
      </button>
    </div>
      <Footer />
    </>
  );
};

export default MovieDetails;
