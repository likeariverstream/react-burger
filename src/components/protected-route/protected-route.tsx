import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import React, { FC } from 'react';
import { getCookie } from '../../utils/coockie'

type TProtectedRoute = RouteProps & { children?: React.ReactNode }

export const ProtectedRoute: FC<TProtectedRoute> = ({ children }) => {
  const login: boolean = !!getCookie('access');
  const location = useLocation();
  return (
    <Route>
      {login ? (
        children
      ) : (<Redirect to={{ pathname: '/login', state: { from: location } }} />)
      || (<Redirect to={{ pathname: '/profile', state: { from: location } }} />)}
    </Route>
  );
}
