import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types'

export const ProtectedRoute = ({ children }) => {
  const login = JSON.parse(sessionStorage.getItem('login'));
  return (
    <Route
      render={() =>
        login ? (
          children
        ) : (<Redirect to='/login' />)
      }
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
}
