import "./Footer.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
const Footer = () => {
  return (
    <footer className="footer">
      <hr />
      <div className="social-footer">
        <a className="a-link" href="#">
          <FacebookIcon className="social" />
        </a>
        <a className="a-link" href="#">
          <GitHubIcon className="social" />
        </a>
        <a className="a-link" href="#">
          <InstagramIcon className="social" />
        </a>
      </div>
      <span className="copyright">Copyright © sdmf s,dmvsv</span>
    </footer>
  );
};
export default Footer;
