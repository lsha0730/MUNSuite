import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scoped.css";
import Logo from "../../common/assets/images/logos/logo.png";
import LogoWhite from "../../common/assets/images/logos/logo_white.png";
import { appContext } from "../../common/Context";
import Button from "../../common/components/input/Button";

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
              innerText="Home"
              type={whiteBar ? "white_secondary" : "black_secondary"}
              size="md"
            />
            <Button
              onClick={() => {
                navigate("/plans");
              }}
              innerText="Plans"
              type={whiteBar ? "white_secondary" : "black_secondary"}
              size="md"
            />
            {user ? (
              <Button
                onClick={() => {
                  if (auth) auth.signOut();
                }}
                innerText="Sign Out"
                type={whiteBar ? "white" : "light"}
                size="md"
              />
            ) : (
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                innerText="Login"
                type={whiteBar ? "white_secondary" : "black_secondary"}
                size="md"
              />
            )}
            {user ? (
              <Button
                onClick={() => {
                  navigate(`/app/${user.uid}`);
                }}
                innerText="Launch App"
                type={whiteBar ? "white" : "light"}
                size="md"
              />
            ) : (
              <Button
                onClick={() => {
                  navigate("/register");
                }}
                innerText="Try MUNSuite Free"
                type={whiteBar ? "white" : "light"}
                size="md"
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Navbar;
