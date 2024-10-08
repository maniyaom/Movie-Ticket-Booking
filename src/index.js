// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AddMovie from './Pages/AddMovie';
import MovieDetails from './Pages/MovieDetails';
import Navbar from './components/Navbar';
import { FirebaseProvider } from './context/firebase';
import Offers from './Pages/Offers'; // Import Offers component
import './components/Navbar.css';
import Account from './Pages/Account';
import MovieTicket from './Pages/MovieTicket';
import MyTickets from './Pages/MyTickets';
import Verify from './Pages/Verify';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/AddMovie" element={<AddMovie />} />
        <Route path="/MovieDetails/:movieId" element={<MovieDetails />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Offers" element={<Offers />} /> {/* Add Offers route */}
        <Route path='/MyTickets/:uid' element={<MyTickets />} />
        <Route path="/MovieTicket/:ticketId" element={<MovieTicket />} />
        <Route path="/Verify" element={<Verify/>}/>
        <Route path='/*' element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </BrowserRouter>
);
