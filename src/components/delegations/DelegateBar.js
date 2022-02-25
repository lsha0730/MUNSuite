import React from "react";
import "./DelegateBar.css";

function DelegateBar(props) {
    return (
        <div className="delegate-container">
            <p className="name">{props.name}</p>
            <div className="code-container">
                <p>{props.code}</p>
            </div>
        </div>
    )
}

export default DelegateBar;