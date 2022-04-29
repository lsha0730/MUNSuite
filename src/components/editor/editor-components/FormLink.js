import React, { useState } from "react";
import { IoClipboard } from "react-icons/io5";
import "./EditorComponents.scoped.css";

function FormLink(props) {
    const [isDisplayingConfirmation, setIsDisplayingConfirmation] = useState(false);

    function copyLink() {
        navigator.clipboard.writeText(props.link);
        setIsDisplayingConfirmation(true);
        setTimeout(() => setIsDisplayingConfirmation(false), 1000);
    }

    return (
        <div className="block-container">
            <p className="heading">Form Link</p>
            <div className="formlink-container">
                <div className="formlink-link-container">
                    <div className="overflow-wrapper"><p>{props.link}</p></div>
                </div>
                <IoClipboard size={26} className="formlink-icon" onClick={copyLink}/>
            </div>
            <div className={isDisplayingConfirmation? "formlink-confirmation-container":"formlink-confirmation-container fade"}>
                <p className="formlink-confirmation-text">Copied!</p>
            </div>
        </div>
    )
}

export default FormLink;