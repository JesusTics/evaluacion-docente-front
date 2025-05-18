import type { ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext, createContext } from 'react';

type RolUsuario = {
  id: number;
  name: string;
  showName: string;
};

type Usuario = {
  id: number;
  username: string;
  nombre: string;
  roles: RolUsuario[];
  grupos: any[]; // Puedes tipar esto más tarde
};

type AuthContextType = {
  user: Usuario | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (userData: Usuario, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: Usuario, userToken: string) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/sign-in');
  };

  const value = {
    user,
    token,
    isLoggedIn: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
