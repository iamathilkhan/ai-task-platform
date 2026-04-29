import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">AI Task Platform</Link>
      </div>
      {isAuthenticated && (
        <div className="nav-user">
          <span style={{color: "var(--text-light)"}}>{currentUser?.email}</span>
          <button onClick={handleLogout} className="btn btn-secondary btn-small">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
