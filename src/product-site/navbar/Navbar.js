import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scoped.css";
import Logo from "./munsuitelogo.png";

function Navbar() {
    return (
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
}

export default Navbar;