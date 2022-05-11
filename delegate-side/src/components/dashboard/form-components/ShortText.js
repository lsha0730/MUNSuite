import React from "react";
import "./PreviewComponents.scoped.css";

function ShortText(props) {
    return (
        <div className="block-container" id="block-container">
            <p className="heading">{props.heading}</p>
            <p className="subheading">{props.subheading}</p>
            <p className={props.required? "required-star":"hidden"}>*</p>
            <input type="text" placeholder="Input here..." className="shorttext-input" onChange={e => {handleChange(e)}}></input>
        </div>
    )

    function handleChange(e) {
        props.updateSubmission(props.id, e.target.value);
    }
}

export default ShortText;