import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';  

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">SBWOrLD</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/">Form</Link>  {/* Link to the form page */}
        </li>
        <li>
          <Link to="/admin">Admin Dashboard</Link>  {/* Link to the admin dashboard */}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
