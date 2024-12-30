import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (!user || location.pathname === '/auth' || location.pathname === '/') {
    return null;
  }

  return (
    <nav className="navbar">
      <Link to="/home" className="logo">FlamingoTube</Link>
      <div className="nav-links">
        <Link to="/discover">Movie Discovery</Link>
        <Link to="/browse-genres">Browse by Genre</Link>
        <Link to="/search">Search</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
