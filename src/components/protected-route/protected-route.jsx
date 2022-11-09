import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export const ProtectedRoute = ({ children, ...rest }) => {
  const auth = useSelector(state => state.login.success);
  console.log(auth)
  return (
    <Route
    {...rest}
    rendrer={() => 
    auth ?  (
      children
    ) : (<Redirect to='/login'/>)
  }
    />
  );
}
