import React, { useEffect, useState } from "react";
import "./PreviewComponents.scoped.css";
import { GoTriangleDown } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Dropdown(props) {
    const [value, setValue] = useState(); // Stores the index of the item in props.options
    const [dropVisible, setDropVisible] = useState(false);
    const [dropRender, setDropRender] = useState();

    let optionRenders = [];
    for (let i=0; i<props.options.length; i++) {
        let option = props.options[i];
        optionRenders.push(
            <div className="dropdown-option-container" onClick={() => {
                setDropVisible(!dropVisible);
                setValue(i);
                }}>
                <div className="dropdown-text-container">
                    <p className="nowrap">{option}</p>
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (dropVisible) {
            setDropRender(
                <div className="dropdown-field">
                    {optionRenders}
                </div>
            );
        } else {
            setDropRender();
        }
    }, [dropVisible])

    return (
        <div style={{display: "flex", flexDirection: "row-reverse"}}>
            <div className="block-container" id="block-container" onClick={()=>props.setEditing(props.id)}>
                <div className={props.editing==props.id? "editing-indicator":"fade"}></div>
                <div className={dropVisible? "dropdown-defocuser":"hidden"} onClick={() => setDropVisible(false)}></div>
                <p className="heading">{props.heading}</p>
                <p className="subheading">{props.subheading}</p>
                <p className={props.required? "required-star":"hidden"}>*</p>
                <div className={dropVisible? "dropdown-bar super-z":"dropdown-bar"} onClick={() => setDropVisible(!dropVisible)}>
                    <div className="dropdown-text-container">
                        <p className="dropdown-selection-text">{props.options[value]}</p>
                    </div>
                    <GoTriangleDown size={10} className="dropdown-triangle"/>
                    {dropRender}
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

export default Dropdown;