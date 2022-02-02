import { IUser } from 'models';
import React, { createContext, useContext, useEffect, useState } from 'react';
import ApiService, { apiService } from '../services/Api';

interface UserInfo {
  _id: string;
  name: string;
  permission: number;
}

interface AuthContextData {
  signed: boolean;
  user: UserInfo | null;
  Login(token: Partial<IUser>): Promise<void>;
  Logout(unauthorized?: boolean): void;
}

const decodeToken = (token: string): UserInfo => {
  const payload = atob(token.split('.')[1]);
  const tokenDecoded = JSON.parse(payload);
  return tokenDecoded as UserInfo;
};

export const saveUserInfoOnStorage = (token: string) => {
  const userInfo = decodeToken(token);
  apiService.defaults.headers.Authorization = `Bearer ${token}`;
  sessionStorage.setItem('@code-network:token', token);
  sessionStorage.setItem('@code-network:user', JSON.stringify(userInfo));
};

const getAuthToken = () => localStorage.getItem('@code-network:token');

const AuthContext: React.Context<AuthContextData> = createContext({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storageToken = sessionStorage.getItem('@code-network:token');
    const storageUser = sessionStorage.getItem('@code-network:user');

    if (storageToken && storageUser) {
      setUser(JSON.parse(storageUser));
      apiService.defaults.headers.Authorization = `Bearer ${storageToken}`;
    }
  }, []);

  const Login = async (data: Partial<IUser>) => {
    const { token } = await ApiService.login(data);
    const user = decodeToken(token);
    setUser(user);
    apiService.defaults.headers.Authorization = `Bearer ${token}`;
    sessionStorage.setItem('@code-network:token', token);
    sessionStorage.setItem('@code-network:user', JSON.stringify(user));
  };

  const Logout = () => {
    setUser(null);
    sessionStorage.removeItem('@code-network:user');
    sessionStorage.removeItem('@code-network:token');
  };

  return <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Invalid context');
  }
  return context;
};

export { AuthProvider, useAuth, getAuthToken };
