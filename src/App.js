import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './UserForm';
import AdminDashboard from './AdminDashboard';
import NavBar from './Navbar';

const App = () => {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<UserForm />} />
      </Routes>
    </Router>
  );
};

export default App;
