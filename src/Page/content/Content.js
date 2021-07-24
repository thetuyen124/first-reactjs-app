import "./content.css";

import React from "react";
import { Switch, Route } from "react-router-dom";

import { BackTop } from "antd";

import HomePage from "../homePage/HomePage";
import Login from "../login/Login";
import PostDetail from "../postDetail/PostDetail";
import SignUp from "../signUp/SignUp";
import EditPost from "../editPost/EditPost";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Error403 from "../error403/Error403";
import AdminPage from "../admin/AdminPage";

const Content = (props) => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/post/:id" exact>
          <PostDetail />
        </Route>
        <PrivateRoute path="/post/edit/:id" exact component={EditPost} />
        <PrivateRoute path="/admin" exact component={AdminPage} />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/403" exact>
          <Error403 />
        </Route>
      </Switch>
      <BackTop duration={300} />
      <Footer />
    </div>
  );
};
export default Content;
