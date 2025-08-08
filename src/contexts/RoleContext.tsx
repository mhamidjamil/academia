"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { User, UserRole } from '@/lib/types';
import { users } from '@/lib/mock-data';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: User;
  isMounted: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>('Admin');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const user = users.find(u => u.role === role) || users[0];

  const value = { role, setRole, user, isMounted };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
