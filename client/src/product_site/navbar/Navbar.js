import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scoped.css";
import Logo from "../../common/assets/images/logos/logo.png";
import LogoWhite from "../../common/assets/images/logos/logo_white.png";
import { appContext } from "../../common/Context";

function Navbar() {
  const { user, auth } = useContext(appContext);
  const { pathname } = useLocation();
  const [showBar, setShowBar] = useState(false);
  const [whiteBar, setWhiteBar] = useState(false);

  useEffect(() => {
    const onHomePage = pathname === "/";
    const onPrepaymentPage = pathname === "/prepayment";
    const onAppPage = /\/app\/\w*/i.test(pathname);
    const onSubmissionPage = /\/form\/\w*/i.test(pathname);

    setShowBar(!(onAppPage || onSubmissionPage));
    setWhiteBar(onHomePage || onPrepaymentPage);
  }, [pathname]);

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
            {user ? (
              <div
                className={whiteBar ? "btt-primary-white" : "btt-signout"}
                onClick={() => {
                  if (auth) auth.signOut();
                }}
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
            {user ? (
              <Link
                to={`/app/${user.uid}`}
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
