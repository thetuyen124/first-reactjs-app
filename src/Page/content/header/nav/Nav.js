import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useJwt } from "react-jwt";
import "./Nav.css";

const logo =
  "https://raw.githubusercontent.com/thetuyen124/first-reactjs-app/master/src/IMG/logo.png";

const Nav = (props) => {
  const [click, setClick] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const { isExpired, reEvaluateToken } = useJwt(token);
  const handleClick = () => {
    setClick(!click);
    if (!click) {
      document.querySelector(".navbar-item").style.right = "0";
    }
    if (click) {
      document.querySelector(".navbar-item").style.right = "-100%";
    }
  };
  const close = () => {
    if (click) {
      setClick(!click);
      document.querySelector(".navbar-item").style.right = "-100%";
    }
  };

  return (
    <div>
      <nav className="navbar" id="navbar">
        <Link className="navbar-logo" onClick={close} to="/">
          <img src={logo} alt="logo" />
        </Link>
        {!click ? (
          <MenuOutlined onClick={handleClick} className="nav-toggle" />
        ) : (
          ""
        )}
        <div className="navbar-item">
          {click ? (
            <CloseOutlined onClick={handleClick} className="nav-toggle" />
          ) : (
            ""
          )}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link onClick={close} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={close} to="/admin">
                Admin page
              </Link>
            </li>
            {token === null || isExpired ? (
              <>
                <li className="nav-item">
                  <Link onClick={close} to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link onClick={close} to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <button
                className="logout-btn"
                onClick={() => {
                  close();
                  localStorage.clear();
                  setToken(null);
                  reEvaluateToken(null);
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            )}
          </ul>
          <div className="clearFix"></div>
        </div>
      </nav>
    </div>
  );
};
export default Nav;
