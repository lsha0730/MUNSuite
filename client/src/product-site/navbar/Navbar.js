import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scoped.css";
import Logo from "./munsuitelogo.png";
import LogoWhite from "./munsuitelogowhite.png";
import { siteContext } from "../../Context";

function Navbar() {
  const { currentUser, handleSignout } = useContext(siteContext);
  let pathname = window.location.pathname;

  const standardBar = (
    <div className="navbar-container">
      <div className="navbar">
        <Link to="/">
          <img src={Logo} className="logo" />
        </Link>
        <div className="options">
          <Link to="/" className="option-text">
            Home
          </Link>
          <Link to="/plans" className="option-text">
            Plans
          </Link>
          <Link to="/login" className="option-text">
            Login
          </Link>
          {currentUser ? (
            <Link to={`/app/${currentUser}`} className="btt-primary">
              Launch App
            </Link>
          ) : (
            <Link to="/register" className="btt-primary">
              Try MUNSuite Free
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  const whiteBar = (
    <div className="navbar-container">
      <div className="navbar">
        <Link to="/">
          <img src={LogoWhite} className="logo" />
        </Link>
        <div className="options">
          <Link to="/" className="option-text-white">
            Home
          </Link>
          <Link to="/plans" className="option-text-white">
            Plans
          </Link>
          <Link to="/login" className="option-text-white">
            Login
          </Link>
          {currentUser ? (
            <Link to={`/app/${currentUser}`} className="btt-primary-white">
              Launch App
            </Link>
          ) : (
            <Link to="/register" className="btt-primary-white">
              Try MUNSuite Free
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  const signedinBar = (
    <div className="navbar-container">
      <div className="navbar">
        <Link to="/">
          <img src={Logo} className="logo" />
        </Link>
        <div className="options">
          <Link to="/" className="option-text">
            Home
          </Link>
          <Link to="/plans" className="option-text">
            Plans
          </Link>
          <div className="btt-signout" onClick={handleSignout}>
            Sign Out
          </div>
          <Link to={`/app/${currentUser}`} className="btt-primary">
            Launch App
          </Link>
        </div>
      </div>
    </div>
  );

  const signedinWhiteBar = (
    <div className="navbar-container">
      <div className="navbar">
        <Link to="/">
          <img src={LogoWhite} className="logo" />
        </Link>
        <div className="options">
          <Link to="/" className="option-text-white">
            Home
          </Link>
          <Link to="/plans" className="option-text-white">
            Plans
          </Link>
          <div className="btt-primary-white" onClick={handleSignout}>
            Sign Out
          </div>
          <Link to={`/app/${currentUser}`} className="btt-primary-white">
            Launch App
          </Link>
        </div>
      </div>
    </div>
  );

  switch (true) {
    case pathname == "/":
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
