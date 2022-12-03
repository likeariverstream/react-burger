import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import React, { FC } from 'react';
import { getCookie } from '../../utils/coockie'
import {routes} from '../../utils/constants';

type TProtectedRoute = RouteProps & {
  children?: React.ReactNode,
  onlyForAuth?: boolean
}

export const ProtectedRoute: FC<TProtectedRoute> = ({ children, onlyForAuth, ...rest }) => {
  const isLoggedIn = getCookie('access');
  const location = useLocation();
  if (!onlyForAuth && isLoggedIn) {
    const { from }: any = location.state || { from: { pathname: '/' } }
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }
  if (onlyForAuth && isLoggedIn) {
    return (
      <Route>
        <Redirect to={{ pathname: routes.login, state: { from: location } }} />
      </Route>
    );
  }
  return <Route {...rest}>{children}</Route>
}
