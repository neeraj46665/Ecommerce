import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; Nitin kumar</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/its_nitin_kumar18?igsh=MXd4cXlwYmtudHB1Mg==">
          Instagram
        </a>
        <a href="https://www.linkedin.com/in/nitin-kumar-b0362b27a/">
          Linkedin
        </a>
        <a href="https://nitinkumargits.github.io/Portfolio-Official/">
          Portfolio
        </a>
      </div>
    </footer>
  );
};
export default Footer;