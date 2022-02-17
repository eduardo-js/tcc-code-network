import jwt_decode from 'jwt-decode';
import { AuthToken, IUser } from 'models';
import React, { createContext, useContext, useEffect, useState } from 'react';
import ApiService from '../services/Api';

interface AuthContextData {
  signed: boolean;
  user: IUser | null;
  token: string | null;
  Login(token: Partial<IUser>): Promise<void>;
  Logout(unauthorized?: boolean): void;
}

const decodeToken = (token: string): AuthToken => {
  const tokenDecoded = jwt_decode(token);
  return tokenDecoded as AuthToken;
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
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

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
    const authTokenInfo = decodeToken(token);
    ApiService.setBearer(token);
    const user = await ApiService.getUser(authTokenInfo._id);
    setToken(token!);
    setUser(user);
    sessionStorage.setItem('@code-network:token', token);
    sessionStorage.setItem('@code-network:user', JSON.stringify(user));
  };

  const Logout = () => {
    setUser(null);
    sessionStorage.removeItem('@code-network:user');
    sessionStorage.removeItem('@code-network:token');
  };

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, token, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Invalid context');
  }
  return context;
};

export { AuthProvider, useAuth, getAuthToken };
