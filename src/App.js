import "./reset.css";
import "antd/dist/antd.css";

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Content from "./Page/content/Content";

const App = () => {
  return (
    <>
      <Router>
        <Content />
      </Router>
    </>
  );
};

export default App;
