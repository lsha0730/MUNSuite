import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scoped.css";
import Logo from "./munsuitelogo.png";
import { getAuth, signOut } from "firebase/auth";

function NavbarDashboard() {
    const auth = getAuth();

    return (
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

    function handleSignout() {
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            console.log(`Signout error (${error.code}): ${error.message}`)
          });          
    }
}

export default NavbarDashboard;