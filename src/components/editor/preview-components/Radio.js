import React, { useEffect, useState } from "react";
import "./PreviewComponents.scoped.css";

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
        <div className="block-container">
            <p className="heading">{props.heading}</p>
            <p className="subheading">{props.subheading}</p>
            <p className={props.required? "required-star":"hidden"}>*</p>
            <div className="radio-options-container">
                {renders}
            </div>
        </div>
    )
}

export default Radio;