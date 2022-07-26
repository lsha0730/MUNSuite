import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scoped.css";
import Logo from "./munsuitelogo.png";
import LogoWhite from "./munsuitelogowhite.png";
import { getAuth, signOut } from "firebase/auth";

function Navbar() {
    const auth = getAuth();
    let pathname = window.location.pathname;

    const standardBar = (
        <div className="navbar-container">
            <div className="navbar">
                <Link to="/"><img src={Logo} className="logo"/></Link>
                <div className="options">
                    <Link to="/" className="option-text">Home</Link>
                    <Link to="/register" className="option-text">Register</Link>
                    <Link to="/login" className="option-text">Login</Link>
                    <Link to="/options" className="option-options">See Options</Link>
                </div>
            </div>
        </div>
    )

    const whiteBar = (
        <div className="navbar-container">
            <div className="navbar">
                <Link to="/"><img src={LogoWhite} className="logo"/></Link>
                <div className="options">
                    <Link to="/" className="option-text-white">Home</Link>
                    <Link to="/register" className="option-text-white">Register</Link>
                    <Link to="/login" className="option-text-white">Login</Link>
                    <Link to="/options" className="option-options-white">See Options</Link>
                </div>
            </div>
        </div>
    )

    const signedinBar = (
        <div className="navbar-container">
            <div className="navbar">
                <Link to="/"><img src={Logo} className="logo"/></Link>
                <div className="options">
                    <div></div>
                    <div></div>
                    <Link to="/" className="option-text">Home</Link>
                    <div className="btt-signout" onClick={handleSignout}>Sign Out</div>
                    <Link to="/dashboard" className="option-options">Open Dashboard</Link>
                </div>
            </div>
        </div>
    )

    const signedinWhiteBar = (
        <div className="navbar-container">
            <div className="navbar">
                <Link to="/"><img src={LogoWhite} className="logo"/></Link>
                <div className="options">
                    <div></div>
                    <div></div>
                    <Link to="/" className="option-text-white">Home</Link>
                    <div className="option-options-white" onClick={handleSignout}>Sign Out</div>
                    <Link to="/dashboard" className="option-options-white">Open Dashboard</Link>
                </div>
            </div>
        </div>
    )

    const dashboardBar = (
        <div className="navbar-container">
            <div className="navbar">
                <Link to="/"><img src={Logo} className="logo"/></Link>
                <div className="options">
                    <div></div>
                    <div className="btt-signout" onClick={handleSignout}>Sign Out</div>
                </div>
            </div>
        </div>
    )

    switch (true) {
        case pathname == "/":
            if (auth.currentUser) {
                return signedinWhiteBar
            } else {
                return whiteBar
            }
        case pathname == "/dashboard":
            return dashboardBar;
        case /\/app\/\w*/i.test(pathname):
            return;
        case /\/form\/\w*/i.test(pathname):
            return;
        default:
            if (auth.currentUser) {
            return signedinBar;
            } else {
            return standardBar;
            }
    }

    function handleSignout() {
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            console.log(`Signout error (${error.code}): ${error.message}`)
          });          
    }
}

export default Navbar;