import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, redirectTo, path, ...props }) => {
  // if not authenticated logic
  return (
    <Route path={path} exact>
      <Component />
    </Route>
  );
};

export default PrivateRoute;
