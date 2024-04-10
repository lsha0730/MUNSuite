import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scoped.css";
import Logo from "../../common/assets/images/logos/logo.png";
import LogoWhite from "../../common/assets/images/logos/logo_white.png";
import { appContext } from "../../common/Context";
import { Button } from "../../common/components/input";

const Navbar = () => {
  const { user, auth } = useContext(appContext);
  const { pathname } = useLocation();
  const [showBar, setShowBar] = useState(false);
  const [whiteBar, setWhiteBar] = useState(false);
  const navigate = useNavigate();

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
      <div className="container">
        <div className="content noselect">
          <Link to="/">
            <img src={whiteBar ? LogoWhite : Logo} className="logo" />
          </Link>
          <div className="options">
            <Button
              onClick={() => {
                navigate("/");
              }}
              type={whiteBar ? "white_secondary" : "black_secondary"}
              size="md"
            >
              Home
            </Button>
            <Button
              onClick={() => {
                navigate("/plans");
              }}
              type={whiteBar ? "white_secondary" : "black_secondary"}
              size="md"
            >
              Plans
            </Button>
            {user ? (
              <Button
                onClick={() => {
                  if (auth) auth.signOut();
                }}
                type={whiteBar ? "white" : "light"}
                size="md"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                type={whiteBar ? "white_secondary" : "black_secondary"}
                size="md"
              >
                Login
              </Button>
            )}
            {user ? (
              <Button
                onClick={() => {
                  navigate(`/app/${user.uid}`);
                }}
                type={whiteBar ? "white" : "light"}
                size="md"
              >
                Launch App
              </Button>
            ) : (
              <Button
                onClick={() => {
                  navigate("/register");
                }}
                type={whiteBar ? "white" : "light"}
                size="md"
              >
                Try MUNSuite Free
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Navbar;
