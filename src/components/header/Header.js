import Nav from "../nav/Nav.js";
import "./Header.css";

const Header = (props) => {
  const { isLogin, setIsLogin } = props;
  return (
    <header className="mastHead">
      <div className="overlay"></div>
      <Nav setIsLogin={setIsLogin} isLogin={isLogin} />
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
