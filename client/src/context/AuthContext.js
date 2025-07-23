import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser({ id: decoded.userId });
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch {
        logout();
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken('');
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
} 