'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';


import apiClient from '@/lib/apiClient';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({children,}: { children: ReactNode;}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  const token = localStorage.getItem('collavix_token');

  const verify = async () => {
    if (!token) return;
    try {
      const res = await apiClient.get('/auth/profile');
      setUser(res.data.user);
    } catch {
      localStorage.removeItem('collavix_token');
    }
  };

  verify().finally(() => setLoading(false));
}, []);

  const login = async (email: string, password: string) => {
    const res = await apiClient.post('/auth/login', {
      email,
      password,
    });

    localStorage.setItem('collavix_token', res.data.token);
    setUser(res.data.user);
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ) => {
    const res = await apiClient.post('/auth/signup', {
      name,
      email,
      password,
    });

    localStorage.setItem('collavix_token', res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('collavix_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}