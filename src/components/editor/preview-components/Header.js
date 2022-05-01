import React from "react";
import "./PreviewComponents.scoped.css";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Header(props) {
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

            <div id="Qmod-icons">
                <div onClick={() => props.updateForm("move-up", props.id)}><IoIosArrowUp className="btt-moveQ"/></div>
                <div onClick={() => props.updateForm("move-down", props.id)}><IoIosArrowDown className="btt-moveQ"/></div>
                <div onClick={() => props.updateForm("delete", props.id)}><FaTrash className="btt-delQ"/></div>
            </div>
        </div>
    )
}

export default Header;