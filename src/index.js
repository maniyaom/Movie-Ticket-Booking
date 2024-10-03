import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import './index.css';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AddMovie from './Pages/AddMovie';
import MovieDetails from './Pages/MovieDetails';
import BookTicket from './Pages/BookTicket';
import Navbar from './components/Navbar';
import './components/Navbar.css'
import Account from './Pages/Account';
import { FirebaseProvider } from './context/firebase';
import MovieTicket from './Pages/MovieTicket';
import Notifications from './Pages/Notifications';

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/BookTicket'];

  const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Home" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/ContactUs/:name" element={<ContactUs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/AddMovie" element={<AddMovie />} />
        <Route path="/MovieDetails/:movieId" element={<MovieDetails />} />
        <Route path="/BookTicket/:movieId" element={<BookTicket />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/MovieTicket/:ticketId" element={<MovieTicket />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path='/*' element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FirebaseProvider>
);