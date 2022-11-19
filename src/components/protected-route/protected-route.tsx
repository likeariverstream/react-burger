import { Route, Redirect } from "react-router-dom";
import React, { FC, ReactNode } from 'react';

type TProtectedRoute = {
  children: ReactNode,
  path: string
}

export const ProtectedRoute: FC<TProtectedRoute> = ({ children }) => {
  const login: boolean = JSON.parse(sessionStorage.getItem('login') as string);
  return (
    <Route>
      {login ? (
        children
      ) : (<Redirect to='/login' />)}
    </Route>
  );
}

