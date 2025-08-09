"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { User, UserRole } from '@/lib/types';
import { users } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';

interface RoleContextType {
  user: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  isMounted: boolean;
  viewAs: (role: UserRole) => void;
  originalUser: User | null;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [originalUser, setOriginalUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
          setOriginalUser(parsedUser);
      }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('user');
    }
  }, []);
  
  const login = (email: string): boolean => {
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
        setUser(foundUser);
        setOriginalUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setOriginalUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  const viewAs = (role: UserRole) => {
    if (originalUser && originalUser.role === 'Admin') {
       if (role === 'Admin') {
         setUser(originalUser);
       } else {
         const tempUser: User = {...originalUser, role: role };
         setUser(tempUser);
       }
    }
  }

  const value = { user, login, logout, isMounted, viewAs, originalUser };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a RoleProvider');
  }
  return context;
};
