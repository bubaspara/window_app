import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import PrivateRoute from "./PrivateRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Switch>

      <PrivateRoute component={Home} path="/" redirectTo="/login" />
    </BrowserRouter>
  );
}
