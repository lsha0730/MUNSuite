import React, { useEffect, useState } from "react";
import "./PreviewComponents.scoped.css";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Radio(props) {
    const [selected, setSelected] = useState(); // Stores the index of selected in props.options
    const [renders, setRenders] = useState([]);

    useEffect(() => {
        let i = -1;
        setRenders(props.options.map(option => {
            i++;
            return (
                <div className="radio-single-container">
                    <input type="radio" value={i}
                        checked={selected==i}
                        onChange={e => {setSelected(e.target.value)}}
                        className="clickable"
                    />
                    <p className="radio-option-label">{option}</p>
                </div>
            )
        }));
    }, [selected, props.options])

    return (
        <div style={{display: "flex", flexDirection: "row-reverse"}}>
            <div className="block-container" id="block-container" onClick={()=>props.setEditing(props.id)}>
                <div className={props.editing==props.id? "editing-indicator":"fade"}></div>
                <p className="heading">{props.heading}</p>
                <p className="subheading">{props.subheading}</p>
                <p className={props.required? "required-star":"hidden"}>*</p>
                <div className="radio-options-container">
                    {renders}
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

export default Radio;