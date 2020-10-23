import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ErrorPage from "./pages/errorpage";
import Landing from "./pages/landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/dashboard";
import IndexUser from "./pages/userProfile";
import DataDriver from "./pages/driver";
import UserAdmin from "./pages/datauser";
import Harian from "./pages/harian";
import DataBank from "./pages/banksampah";
import Sampah3r from "./pages/sampah3r";
import LaporSampah from "./pages/lapor";
import IndexSampahTPA from "./pages/sampahTPA";
import IndexLapResidu from "./pages/lapResidu";
import IndexLapResiduBulan from "./pages/lapResiduBulan";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/user" component={IndexUser} />
        <PrivateRoute exact path="/driver" component={DataDriver} />
        <PrivateRoute exact path="/datauser" component={UserAdmin} />
        <PrivateRoute exact path="/harian" component={Harian} />
        <PrivateRoute exact path="/bsampah" component={DataBank} />
        <PrivateRoute exact path="/sampah3r" component={Sampah3r} />
        <PrivateRoute exact path="/lapor" component={LaporSampah} />
        <PrivateRoute exact path="/sampahTPA" component={IndexSampahTPA} />
        <PrivateRoute exact path="/lapresidu" component={IndexLapResidu} />
        <PrivateRoute exact path="/tpabulan" component={IndexLapResiduBulan} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
