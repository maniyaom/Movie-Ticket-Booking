import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ForgotPassword from './ForgotPassword'; // Import the ForgotPassword component
import PasswordReset from './PasswordReset';
import Login from './Login'; // Import the Login component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset" component={PasswordResetPage} />

        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
