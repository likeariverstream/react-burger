import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

export const ProtectedRoute = ({ children, ...rest }) => {
  const login = JSON.parse(sessionStorage.getItem('login'));
  return (
    <Route
      {...rest}
      render={() =>
        login ? (
          children
        ) : (<Redirect to='/login' />)
      }
    />
  );
}
