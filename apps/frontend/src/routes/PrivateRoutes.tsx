import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';

const PrivateRoute = ({ ...routeProps }) => {
  const { signed } = useAuth();
  if (signed) {
    return <Route {...routeProps} />;
  }
  return <Redirect to={'/login'} />;
};

export default PrivateRoute;
