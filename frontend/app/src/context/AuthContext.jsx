import React, { createContext, useState, useContext } from 'react';
import { login, getUserInfo, logout } from '@/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const loginUser = async (credentials) => {
    try {
      const response = await login(credentials);
      if (response.success) {
        localStorage.setItem('token', response.token);
        const userData = await getUserInfo();
        if (userData.success && userData.message === 'Get profile success') {
          setUser(userData.data.user);
          localStorage.setItem('user', JSON.stringify(userData.data.user));
        }
        return response;
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message };
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login: loginUser, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);