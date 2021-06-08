import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import CreateFeed from "../screens/CreateFeed";
import Canvas from "../components/Canvas/Canvas";

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
        <Route exact path="/createfeed">
          <CreateFeed />
        </Route>
        <Route exact path="/feed/:feedId">
          <Canvas />
        </Route>
      </Switch>

      <PrivateRoute component={Home} path="/" redirectTo="/login" />
    </BrowserRouter>
  );
}
