import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "./munsuitelogo.png";
import LogoWhite from "./munsuitelogowhite.png";
import { siteContext } from "../../Context";

function Navbar() {
  const { currentUser, handleSignout } = useContext(siteContext);
  let pathname = window.location.pathname;

  const standardBar = (
    <div className={styles.navbar_container}>
      <div className={styles.navbar}>
        <Link to="/">
          <img src={Logo} className={styles.logo} />
        </Link>
        <div className={styles.options}>
          <Link to="/" className={styles.option_text}>
            Home
          </Link>
          <Link to="/plans" className={styles.option_text}>
            Plans
          </Link>
          <Link to="/login" className={styles.option_text}>
            Login
          </Link>
          {currentUser ? (
            <Link to={`/app/${currentUser}`} className={styles.btt_primary}>
              Launch App
            </Link>
          ) : (
            <Link to="/register" className={styles.btt_primary}>
              Try MUNSuite Free
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  const whiteBar = (
    <div className={styles.navbar_container}>
      <div className={styles.navbar}>
        <Link to="/">
          <img src={LogoWhite} className={styles.logo} />
        </Link>
        <div className={styles.options}>
          <Link to="/" className={styles.option_text_white}>
            Home
          </Link>
          <Link to="/plans" className={styles.option_text_white}>
            Plans
          </Link>
          <Link to="/login" className={styles.option_text_white}>
            Login
          </Link>
          {currentUser ? (
            <Link
              to={`/app/${currentUser}`}
              className={styles.btt_primary_white}
            >
              Launch App
            </Link>
          ) : (
            <Link to="/register" className={styles.btt_primary_white}>
              Try MUNSuite Free
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  const signedinBar = (
    <div className={styles.navbar_container}>
      <div className={styles.navbar}>
        <Link to="/">
          <img src={Logo} className={styles.logo} />
        </Link>
        <div className={styles.options}>
          <Link to="/" className={styles.option_text}>
            Home
          </Link>
          <Link to="/plans" className={styles.option_text}>
            Plans
          </Link>
          <div className={styles.btt_signout} onClick={handleSignout}>
            Sign Out
          </div>
          <Link to={`/app/${currentUser}`} className={styles.btt_primary}>
            Launch App
          </Link>
        </div>
      </div>
    </div>
  );

  const signedinWhiteBar = (
    <div className={styles.navbar_container}>
      <div className={styles.navbar}>
        <Link to="/">
          <img src={LogoWhite} className={styles.logo} />
        </Link>
        <div className={styles.options}>
          <Link to="/" className={styles.option_text_white}>
            Home
          </Link>
          <Link to="/plans" className={styles.option_text_white}>
            Plans
          </Link>
          <div className={styles.btt_primary_white} onClick={handleSignout}>
            Sign Out
          </div>
          <Link to={`/app/${currentUser}`} className={styles.btt_primary_white}>
            Launch App
          </Link>
        </div>
      </div>
    </div>
  );

  switch (true) {
    case ["/", "/prepayment"].includes(pathname):
      if (currentUser) {
        return signedinWhiteBar;
      } else {
        return whiteBar;
      }
    case /\/app\/\w*/i.test(pathname):
      return;
    case /\/form\/\w*/i.test(pathname):
      return;
    default:
      if (currentUser) {
        return signedinBar;
      } else {
        return standardBar;
      }
  }
}

export default Navbar;
