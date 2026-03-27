import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { api } from '../services/api';
import type { LoginPayload, RegisterPayload, User } from '../types/auth';
import { AuthContext } from './AuthContext';

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('@token');
  });

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('@user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  async function login(data: LoginPayload) {
    const response = await api.post('/auth/login', data);

    const { token, user } = response.data;

    setToken(token);
    setUser(user);

    localStorage.setItem('@token', token);
    localStorage.setItem('@user', JSON.stringify(user));

    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  async function register(data: RegisterPayload) {
    await api.post('/auth/register', data);
  }

  function logout() {
    setToken(null);
    setUser(null);

    localStorage.removeItem('@token');
    localStorage.removeItem('@user');

    delete api.defaults.headers.common.Authorization;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
