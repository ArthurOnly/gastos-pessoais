import React, { useEffect } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import { isAuthenticated } from "./helpers/auth"

import SignIn from "./pages/sign-in"
import SignUp from "./pages/sign-up"
import Dashboard from './pages/dashboard'

const PrivateRoute = ({children, ...rest}) => (
  <Route {...rest}>
    {isAuthenticated() ? children : <Redirect to='/sign-in'/> }
  </Route>
)

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/">
          <Dashboard/>
        </PrivateRoute>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <PrivateRoute path="/test">
          <h1>Teste</h1>
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
