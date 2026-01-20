import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, users } from '@/api/users';

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('mg-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('mg-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mg-user');
    }
  }, [user]);

  const login = (email: string, password: string) => {
    const foundUser = users.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      setUser(foundUser);
      return { success: true, message: 'Connexion réussie!' };
    }
    
    return { success: false, message: 'Email ou mot de passe incorrect.' };
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <UserContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
