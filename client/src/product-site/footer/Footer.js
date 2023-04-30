import React from "react";
import styles from "./Footer.module.css";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  let pathname = window.location.pathname;

  const footer = (
    <div className={styles.footer}>
      <div className={styles.footer_text}>
        MUNSuite © 2022&nbsp;&nbsp;|&nbsp;&nbsp;By
        <a
          className={styles.name}
          href="https://www.linkedin.com/in/lincoln-seungha-lee/"
        >
          Lincoln Lee&nbsp;
          <FaLinkedin size={16} />
        </a>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <a style={{ color: "#BCBCBC" }} href="mailto:info@munsuite.com">
          Shoot me an email!
        </a>
      </div>
    </div>
  );

  switch (true) {
    case /\/app\/\w*/i.test(pathname):
      return;
    case /\/form\/\w*/i.test(pathname):
      return;
    default:
      return footer;
  }
}

export default Footer;
