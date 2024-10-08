// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home'; // Ensure Home.js exists in the pages folder
import AboutUs from './pages/AboutUs'; // Ensure AboutUs.js exists in the pages folder
import Offers from './pages/Offers'; // Ensure Offers.js exists in the pages folder
import ContactUs from './pages/ContactUs'; // Ensure ContactUs.js exists in the pages folder
import Login from './pages/Login'; // Ensure Login.js exists in the pages folder

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Replace Home with your actual home component */}
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Offers" element={<Offers />} />
        <Route path="/ContactUs" element={<ContactUs />} /> {/* Assuming you have a ContactUs page */}
        <Route path="/Login" element={<Login />} /> {/* Assuming you have a Login page */}
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
