import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, redirectTo, path, ...props }) => {
  const { authState } = useAuth();

  // Authentication logic
  console.log(authState);
  if (!authState) {
    return <Redirect to={redirectTo} />;
  }
  return (
    <Route path={path} exact>
      <Component />
    </Route>
  );
};

export default PrivateRoute;
