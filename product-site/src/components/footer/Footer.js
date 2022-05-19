import React from "react";
import "./Footer.scoped.css";

function Footer() {
    return (
        <div className="footer">
            <div className="footer-contents">
                <p className="footer-text">MUNSuite © 2022<br/>All Rights Reserved.</p>

                <div style={{display: "flex", flexDirection: "column"}}>
                    <p className="footer-text">Created by Lincoln Lee</p>
                    <p className="footer-text">Shoot me an <a style={{color: "#BCBCBC"}} href="mailto:digitaldirectivesystem@gmail.com">email!</a></p>
                </div>
            </div>
        </div>
    )
}

export default Footer;