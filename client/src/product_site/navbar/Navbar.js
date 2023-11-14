import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scoped.css";
import Logo from "../../common/assets/images/logos/logo.png";
import LogoWhite from "../../common/assets/images/logos/logo_white.png";
import { siteContext } from "../../Context";

function Navbar() {
  const { currentUser, handleSignout } = useContext(siteContext);
  const pathname = window.location.pathname;

  const onHomePage = pathname === "/";
  const onPrepaymentPage = pathname === "/prepayment";
  const onAppPage = /\/app\/\w*/i.test(pathname);
  const onSubmissionPage = /\/form\/\w*/i.test(pathname);

  const showBar = !(onAppPage || onSubmissionPage);
  const whiteBar = onHomePage || onPrepaymentPage;
  const signedInBar = Boolean(currentUser);

  return (
    showBar && (
      <div className="navbar-container">
        <div className="navbar">
          <Link to="/">
            <img src={whiteBar ? LogoWhite : Logo} className="logo" />
          </Link>
          <div className="options">
            <Link
              to="/"
              className={whiteBar ? "option-text-white" : "option-text"}
            >
              Home
            </Link>
            <Link
              to="/plans"
              className={whiteBar ? "option-text-white" : "option-text"}
            >
              Plans
            </Link>
            {signedInBar ? (
              <div
                className={whiteBar ? "btt-primary-white" : "btt-signout"}
                onClick={handleSignout}
              >
                Sign Out
              </div>
            ) : (
              <Link
                to="/login"
                className={whiteBar ? "option-text-white" : "option-text"}
              >
                Login
              </Link>
            )}
            {signedInBar ? (
              <Link
                to={`/app/${currentUser}`}
                className={whiteBar ? "btt-primary-white" : "btt-primary"}
              >
                Launch App
              </Link>
            ) : (
              <Link
                to="/register"
                className={whiteBar ? "btt-primary-white" : "btt-primary"}
              >
                Try MUNSuite Free
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Navbar;
