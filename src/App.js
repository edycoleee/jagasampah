import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ErrorPage from "./pages/errorpage";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
