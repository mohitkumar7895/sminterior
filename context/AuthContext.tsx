'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (user: UserProfile) => void;
  logout: () => Promise<void>;
  isConsultationModalOpen: boolean;
  openConsultationModal: (serviceName?: string) => void;
  closeConsultationModal: () => void;
  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  preselectedService: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUser(data.user);
          }
        }
      } catch (err) {
        // Not authenticated
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);

  const login = (newUser: UserProfile) => {
    setUser(newUser);
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    window.location.href = '/admin/login';
  };

  const openConsultationModal = (serviceName?: string) => {
    if (serviceName) setPreselectedService(serviceName);
    setIsConsultationModalOpen(true);
  };

  const closeConsultationModal = () => {
    setIsConsultationModalOpen(false);
    setPreselectedService('');
  };

  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isConsultationModalOpen,
        openConsultationModal,
        closeConsultationModal,
        isSearchModalOpen,
        openSearchModal,
        closeSearchModal,
        preselectedService,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

