import React, { useContext } from "react";
import "./Navbar.css";
import Logo from "./munsuitelogo.png";
import { appContext } from "../../Context";

function Navbar() {
    const {page, setPage} = useContext(appContext);

    return (
        <div className="navbar-container">
            <img src={Logo} className="logo"/>
            <div className="options">
                <p className="option-text" onClick={() => {setPage("home")}}>Home</p>
                <p className="option-text" onClick={() => {setPage("features")}}>Features</p>
                <p className="option-text" onClick={() => {setPage("login")}}>Login</p>
                <p className="option-text" onClick={() => {setPage("register")}}>Register</p>
                <div className="option-buy" onClick={() => {setPage("buy")}}>Buy</div>
            </div>
        </div>
    )
}

export default Navbar;