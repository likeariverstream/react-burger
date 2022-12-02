import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import React, { FC } from 'react';
import { useSelector } from '../../utils/hooks'

type TProtectedRoute = RouteProps & { children?: React.ReactNode }

export const ProtectedRoute: FC<TProtectedRoute> = ({ children }) => {
  const { isLoggedIn: login } = useSelector(state => state.login)
  const location = useLocation();
  return (
    <Route>
      {login ? (
        children
      ) : (<Redirect to={{ pathname: '/login', state: { from: location } }} />)
      // || (<Redirect to={{ pathname: '/profile', state: { from: location } }} />)
      }
    </Route>
  );
}
