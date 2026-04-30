import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState(null);

  const decodeToken = (token) => {
    try {
      if (!token || typeof token !== 'string') return null;
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = parts[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      const user = decodeToken(token);
      if (user) {
        setCurrentUser(user);
      } else {
        setToken(null);
      }
    } else {
      localStorage.removeItem('token');
      setCurrentUser(null);
    }
  }, [token]);

  const login = (newToken) => {
    if (newToken) {
      setToken(newToken);
    }
  };

  const logout = () => {
    setToken(null);
  };

  const value = {
    token,
    currentUser,
    isAuthenticated: !!token,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
