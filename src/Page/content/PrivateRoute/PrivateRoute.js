import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isExpired } from "react-jwt";

const PrivateRoute = (props) => {
  const condition =
    localStorage.getItem("token") === null ||
    isExpired(localStorage.getItem("token"));
  return !condition ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/403" />
  );
};
export default PrivateRoute;
