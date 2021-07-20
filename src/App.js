import "./reset.css";
import "antd/dist/antd.css";

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
        <BackTop />
        <Footer />
      </Router>
    </>
  );
};

export default App;
