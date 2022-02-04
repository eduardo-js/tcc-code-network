import jwt_decode from 'jwt-decode';
import { IUser } from 'models';
import React, { createContext, useContext, useEffect, useState } from 'react';
import ApiService from '../services/Api';
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
  const tokenDecoded = jwt_decode(token);
  return tokenDecoded as UserInfo;
};

export const saveUserInfoOnStorage = (token: string) => {
  const userInfo = decodeToken(token);
  ApiService.setBearer(token);
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
      ApiService.setBearer(storageToken);
    }
  }, []);

  const Login = async (data: Partial<IUser>) => {
    const { token } = await ApiService.login(data);
    const user = decodeToken(token);
    setUser(user);
    ApiService.setBearer(token);
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
