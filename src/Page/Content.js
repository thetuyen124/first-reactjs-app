import "./content.css";

import { Switch, Route } from "react-router-dom";

import HomePage from "./HomePage";
import Login from "./Login";
import Post from "./Post";
import Profile from "./Profile.js";
import HomeWork from "../components/HomeWork/HomeWork";
import PostDetail from "./PostDetail";
import SignUp from "./SignUp";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

const Content = (props) => {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <PrivateRoute path="/post" exact component={Post} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/post/:id" exact component={PostDetail} />
      <Route path="/exercise">
        <HomeWork />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
    </Switch>
  );
};
export default Content;
