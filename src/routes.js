import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "./helpers/auth";

import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";

const PrivateRoute = ({ children: Children, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Children {...props} />
      ) : (
        <Redirect to={{ pathname: "/sign-in", state: { from: props.location } }} />
      )
    }
  />
);

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/">
          <h1>Dashboard</h1>
        </PrivateRoute>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <PrivateRoute path="/test" component={()=> <h1>Teste</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
