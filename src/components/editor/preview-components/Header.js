import React from "react";
import "./PreviewComponents.scoped.css";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosLock } from "react-icons/io";

function Header(props) {
    let qmodIcons;
    if (props.locked) {
        qmodIcons = (
            <div className="locked-icon-container">
                <IoIosLock className="locked-icon"/>
            </div>
        )
    } else {
        qmodIcons = [
            <div id="Qmod-icons">
                <div onClick={() => props.updateForm("move-up", props.id)}><IoIosArrowUp className="btt-moveQ"/></div>
                <div onClick={() => props.updateForm("move-down", props.id)}><IoIosArrowDown className="btt-moveQ"/></div>
                <div onClick={() => props.updateForm("delete", props.id)}><FaTrash className="btt-delQ"/></div>
            </div>
        ]
    }

    return (
        <div style={{display: "flex", flexDirection: "row-reverse"}}>
            <div className="header-container" id="block-container" onClick={()=>props.setEditing(props.id)}>
                <div className={props.editing==props.id? "editing-indicator":"fade"}></div>
                <div className="header-image-container">
                    <img src={props.image} alt="form-banner" className="header-image"/>
                </div>
                <div className="header-text-container">
                    <p className="header-heading">{props.heading}</p>
                    <p className="header-subheading">{props.subheading}</p>
                </div>
            </div>

            {qmodIcons}
        </div>
    )
}

export default Header;