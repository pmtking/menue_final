'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getAdminToken, saveAdminToken, removeAdminToken } from '@/libs/auth';

type AdminAuthContextType = {
  adminToken: string | null;
  isAdminAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType>({
  adminToken: null,
  isAdminAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminToken, setAdminToken] = useState<string | null>(null);

  useEffect(() => {
    const token = getAdminToken();
    if (token) setAdminToken(token);
  }, []);

  const login = (token: string) => {
    saveAdminToken(token);
    setAdminToken(token);
  };

  const logout = () => {
    removeAdminToken();
    setAdminToken(null);
  };

  const isAdminAuthenticated = !!adminToken;

  return (
    <AdminAuthContext.Provider value={{ adminToken, isAdminAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
