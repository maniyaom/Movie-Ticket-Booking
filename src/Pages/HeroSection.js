import React from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="overlay"></div>
      <div className="hero-content">
        <h1 className="title">Explore the World with Ease</h1>
        <p className="subtitle">Book your tickets effortlessly for flights, buses, and trains.</p>
        <Link className="cta-button" to={'/login'} >Get Started</Link>
      </div>
    </div>
  );
}

export default HeroSection;
