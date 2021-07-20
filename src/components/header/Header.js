import Nav from "../nav/Nav.js";
import "./Header.css";
import React from "react";
const Header = (props) => {
  return (
    <header className="mastHead">
      <div className="overlay"></div>
      <Nav />
      <div className="clearFix"></div>
      <div className="page-heading">
        <div className="container">
          <h1>Tuyển Nhé</h1>
          <span className="subheading">Enjoy programming </span>
        </div>
      </div>
    </header>
  );
};
export default Header;
