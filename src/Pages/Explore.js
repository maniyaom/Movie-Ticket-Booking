import React, { useEffect, useState } from 'react';
import './Explore.css';
import Footer from '../components/Footer';

// Import images
import JokerFoliePoster from '../assets/images/Joker.jpg'; 
import DeadpoolPoster from '../assets/images/dxv.jpg'; 
import VenomPoster from '../assets/images/Venom.jpg'; 
import ThunderboltsPoster from '../assets/images/Thunderbolts.jpg'; 
import CaptainAmericaPoster from '../assets/images/CaptainAmerica.jpg'; 
import AvengersPoster from '../assets/images/Avengers.jpg'; 
import AvatarPoster from '../assets/images/Avatar.jpg'; 
import GladiatorPoster from '../assets/images/Gladiator.jpg'; 
import F1FilmPoster from '../assets/images/F1.jpg'; 
import MissionImpossiblePoster from '../assets/images/MissionImpossible.jpg'; 
import MufasaPoster from '../assets/images/Mufasa.jpg'; 

// Movies data
const moviesData = [
  {
    id: 1,
    title: "Joker: Folie à Deux",
    poster: JokerFoliePoster,
    cast: "Joaquin Phoenix, Lady Gaga",
    description: "A musical sequel exploring the relationship between Arthur Fleck and Harley Quinn.",
    rating: 4.7,
    genre: "Drama, Musical"
  },
  {
    id: 2,
    title: "Deadpool & Wolverine",
    poster: DeadpoolPoster,
    cast: "Ryan Reynolds, Hugh Jackman",
    description: "Deadpool and Wolverine team up for a wild adventure filled with humor and action.",
    rating: 4.5,
    genre: "Action, Comedy"
  },
  {
    id: 3,
    title: "Venom: The Last Dance",
    poster: VenomPoster,
    cast: "Tom Hardy, Woody Harrelson",
    description: "Venom faces new threats and struggles with his identity in a chaotic world.",
    rating: 4.2,
    genre: "Action, Sci-Fi"
  },
  {
    id: 4,
    title: "Thunderbolts",
    poster: ThunderboltsPoster,
    cast: "Sebastian Stan, Florence Pugh",
    description: "A group of anti-heroes come together for a mission that could change the world.",
    rating: 4.3,
    genre: "Action, Adventure"
  },
  {
    id: 5,
    title: "Captain America: Brave New World",
    poster: CaptainAmericaPoster,
    cast: "Anthony Mackie, Harrison Ford",
    description: "Captain America takes on new challenges in a world that has changed drastically.",
    rating: 4.6,
    genre: "Action, Adventure"
  },
  {
    id: 6,
    title: "Avengers: Secret Wars",
    poster: AvengersPoster,
    cast: "Various Marvel Heroes",
    description: "The Avengers unite to battle a powerful enemy threatening the universe.",
    rating: 4.8,
    genre: "Action, Sci-Fi"
  },
  {
    id: 7,
    title: "Avatar: Fire and Ash",
    poster: AvatarPoster,
    cast: "Zoe Saldana, Sam Worthington",
    description: "A new chapter in the Avatar saga, exploring the world of Pandora in depth.",
    rating: 4.4,
    genre: "Sci-Fi, Adventure"
  },
  {
    id: 8,
    title: "Gladiator 2",
    poster: GladiatorPoster,
    cast: "Paul Mescal, Denzel Washington",
    description: "A sequel to the classic epic, focusing on a new gladiator's journey.",
    rating: 4.5,
    genre: "Action, Drama"
  },
  {
    id: 9,
    title: "F1 (film)",
    poster: F1FilmPoster,
    cast: "Brad Pitt, Lewis Hamilton",
    description: "A thrilling look into the world of Formula 1 racing and its elite drivers.",
    rating: 4.3,
    genre: "Action, Sport"
  },
  {
    id: 10,
    title: "Mission: Impossible - Dead Reckoning Part Two",
    poster: MissionImpossiblePoster,
    cast: "Tom Cruise, Rebecca Ferguson",
    description: "Ethan Hunt embarks on another thrilling mission with high stakes.",
    rating: 4.7,
    genre: "Action, Adventure"
  },
  {
    id: 11,
    title: "Mufasa: The Lion King",
    poster: MufasaPoster,
    cast: "Aaron Pierre, Matthew Broderick",
    description: "A prequel to The Lion King, exploring Mufasa's rise to power.",
    rating: 4.5,
    genre: "Animation, Adventure"
  },
];

// Main component
const Explore = () => {
  const [movies, setMovies] = useState(moviesData);

  useEffect(() => {
    document.title = 'Explore Movies';
  }, []);

  return (
    <>
      <div className="explore-container">
        <h1 className="explore-title">Explore Movies</h1>

        <div className="explore-movie-list">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img src={movie.poster} alt={movie.title} className="movie-poster" />
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p><strong>Cast:</strong> {movie.cast}</p>
                <p>{movie.description}</p>
                <p><strong>Rating:</strong> {movie.rating} / 5</p>
                <button className="get-tickets-btn">Get Tickets</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Explore;