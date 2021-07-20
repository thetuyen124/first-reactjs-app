import "./Footer.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import React from "react";
const Footer = () => {
  return (
    <footer className="footer">
      <hr />
      <div className="social-footer">
        <a className="a-link" href="https://fb.com">
          <FacebookIcon className="social" />
        </a>
        <a className="a-link" href="https://github.com">
          <GitHubIcon className="social" />
        </a>
        <a className="a-link" href="https://instagram.com">
          <InstagramIcon className="social" />
        </a>
      </div>
      <span className="copyright">Copyright © ...</span>
    </footer>
  );
};
export default Footer;
