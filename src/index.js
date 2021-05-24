import React from "react";
import ReactDOM from "react-dom";
import history from './history'
import { Router, Route, Switch } from "react-router-dom";


import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import Auth from "views/Auth/Auth.js";
import LoginGoogle from "components/Auth/LoginGoogle.js"
import Profile from "views/Profile/Profile"
import AdminProfile from "views/AdminProfile/AdminProfile.js"
import Homepage from "views/Homepage/Homepage.js"



ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/components" component={Components} />
      <Route path="/auth" component={Auth} />
      <Route path="/auth-google" component={LoginGoogle} />
      <Route path="/profile" component={Profile} />
      <Route path="/admin-profile" component={AdminProfile} />
      <Route path="/" component={Homepage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
