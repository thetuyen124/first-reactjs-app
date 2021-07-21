import "./reset.css";
import "antd/dist/antd.css";

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { BackTop } from "antd";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Content from "./Page/Content";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Content />
        <BackTop duration={300} />
        <Footer />
      </Router>
    </>
  );
};

export default App;
