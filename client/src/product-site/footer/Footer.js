import React from "react";
import "./Footer.scoped.css";

function Footer() {
    let pathname = window.location.pathname;

    const footer = (
        <div className="footer">
            <p className="footer-text">MUNSuite © 2022&nbsp;&nbsp;|&nbsp;&nbsp;By Lincoln Lee&nbsp;&nbsp;|&nbsp;&nbsp;<a style={{color: "#BCBCBC"}} href="mailto:info@munsuite.com">Shoot me an email!</a></p>
        </div>
    )

    switch (true) {
      case pathname == "/dashboard":
        return;
      case /\/app\/\w*/i.test(pathname):
        return;
      case /\/form\/\w*/i.test(pathname):
        return;
      default:
        return footer;
    }
}

export default Footer;