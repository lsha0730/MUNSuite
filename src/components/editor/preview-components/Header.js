import React from "react";
import "./PreviewComponents.scoped.css";

function Header(props) {
    return (
        <div className="header-container">
            <div className="header-image-container">
                <img src={props.image} alt="form-banner" className="header-image"/>
            </div>
            <div className="header-text-container">
                <p className="header-heading">{props.heading}</p>
                <p className="header-subheading">{props.subheading}</p>
            </div>
        </div>
    )
}

export default Header;