import "./App.css";
import "./reset.css";
import "./custom.css";
import "antd/dist/antd.css";

import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { BackTop } from "antd";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Content from "./Page/Content";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Router>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />
        <Content isLogin={isLogin} setIsLogin={setIsLogin} />
        <BackTop />
        <Footer />
      </Router>
    </>
  );
};

export default App;
