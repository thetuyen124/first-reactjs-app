import axios from "axios";

import "antd/dist/antd.css";

import { Alert } from "antd";
import { useEffect, useState } from "react";

const Login = (props) => {
  const { message, setIsLogin } = props;

  const [disable, setDisable] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState("");

  useEffect(() => {
    document.title = "Login";
  }, []);
  const validEmailOnBlur = () => {
    if (email === "") {
      setEmailError("Required");
      return;
    } else if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setEmailError("Must be valid email");
      return;
    }
    setEmailError("");
  };

  const validEmailChange = (evt) => {
    setEmail(evt.target.value);
    validEmailOnBlur();
  };

  const validPasswordOnBlur = () => {
    if (password === "") {
      setPasswordError("Required");
      return;
    }
  };

  const validPasswordOnChange = (evt) => {
    setPassword(evt.target.value);
    if (password.length <= 6) {
      setPasswordError("At least 8 characters");
      return;
    }
    setPasswordError("");
  };

  const login = () => {
    if (emailError === "" && passwordError === "") {
      setDisable(true);
      axios
        .get("https://60dff0ba6b689e001788c858.mockapi.io/token")
        .then((response) => {
          localStorage.clear();
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          console.log(response);
          setLoginState("Login success.");
          setIsLogin(true);
          setDisable(false);
        })
        .catch((error) => {
          setDisable(false);
          setLoginState(error);
        });
    }
  };

  return (
    <div style={{ textAlign: "center" }} className="mainContent">
      <div className="input-field">
        <h2>{message}</h2>
        <input
          type="email"
          onChange={validEmailChange}
          onBlur={validEmailOnBlur}
          className="input-text"
          placeholder="Email"
          value={email}
        ></input>

        {!emailError == "" ? (
          <Alert message={emailError} type="error" showIcon />
        ) : (
          ""
        )}
      </div>
      <div className="input-field">
        <input
          onChange={validPasswordOnChange}
          onBlur={validPasswordOnBlur}
          className="input-text"
          placeholder="Password"
          type="password"
          value={password}
        ></input>
        {!passwordError == "" ? (
          <Alert message={passwordError} type="error" showIcon />
        ) : (
          ""
        )}
      </div>
      <button disabled={disable} onClick={login}>
        Submit
      </button>
      {!loginState == "" ? (
        <Alert message={loginState} type="success" showIcon />
      ) : (
        ""
      )}
    </div>
  );
};
export default Login;
