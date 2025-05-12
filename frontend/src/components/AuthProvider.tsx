import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
  twoFactorEnabled: boolean;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, twoFactorCode?: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  isLoading: false,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  updateUser: () => {}
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage for existing user data
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Update localStorage when user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string, twoFactorCode?: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
        twoFactorCode
      });
      
      setUser(response.data);
      return response.data;
    } catch (error: any) {
      const requiresTwoFactor = error.response?.data?.requiresTwoFactor;
      if (requiresTwoFactor) {
        throw new Error('2FA code required');
      }
      throw new Error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password
      });
      
      // Registration successful but don't log the user in yet
      // since they need to verify with 2FA first
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, signup, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
