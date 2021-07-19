import "./content.css";

import { Switch, Route } from "react-router-dom";

import HomePage from "./HomePage";
import Login from "./Login";
import Post from "./Post";
import Profile from "./Profile.js";
import HomeWork from "../components/HomeWork/HomeWork";
import PostDetail from "./PostDetail";

const Content = (props) => {
  const { isLogin, setIsLogin } = props;
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/post" exact>
        <Post />
      </Route>
      <Route path="/profile">
        <Profile isLogin={isLogin} setIsLogin={setIsLogin} />
      </Route>
      <Route path="/exercise">
        <HomeWork />
      </Route>
      <Route path="/login">
        <Login isLogin={isLogin} setIsLogin={setIsLogin} />
      </Route>
      <Route path="/post/:id">
        <PostDetail />
      </Route>
    </Switch>
  );
};
export default Content;
