import "./content.css";
import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./HomePage";
import Login from "./Login";
import Post from "./Post";
import Profile from "./Profile.js";
import PostDetail from "./PostDetail";
import SignUp from "./SignUp";
import EditPost from "./EditPost";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import TestJwt from "../components/TestJwt";

const Content = (props) => {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <PrivateRoute path="/post" exact component={Post} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/post/:id" exact component={PostDetail} />
      <PrivateRoute path="/post/edit/:id" exact component={EditPost} />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/test">
        <TestJwt />
      </Route>
    </Switch>
  );
};
export default Content;
