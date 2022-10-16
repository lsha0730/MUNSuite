import React from "react";
import "./InvalidLink.scoped.css";
import { BiCompass } from "react-icons/bi";

function InvalidLink(props) {
    return (
        <div className="invalid-container">
            <div className="invalid-card-container">
                <BiCompass size={100} className="icon"/>
                <p className="heading">Invalid Form Link</p>
                <p className="subheading">Contact your staff member</p>
            </div>
        </div>
    )
}

export default InvalidLink