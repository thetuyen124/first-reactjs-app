import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import React from "react";

const Error403 = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <div>
          <Link to="/">
            <Button>Back Home</Button>
          </Link>
          <Link to="/">
            <Button
              danger
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              Switch account
            </Button>
          </Link>
        </div>
      }
    />
  );
};
export default Error403;
