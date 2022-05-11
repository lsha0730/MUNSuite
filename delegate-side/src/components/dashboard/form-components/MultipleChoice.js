import React, { useEffect, useState } from "react";
import "./PreviewComponents.scoped.css";

function MultipleChoice(props) {
    const [selected, setSelected] = useState([]); // Stores the indices of selected in props.options
    const [renders, setRenders] = useState([]);

    useEffect(() => {
        props.updateSubmission(props.id, selected.map(index => props.options[index]))
    }, [selected])

    useEffect(() => {
        let i = -1;
        setRenders(props.options.map(option => {
            i++;
            return (
                <div className="mc-single-container">
                    <input type="checkbox" value={i}
                        checked={selected.includes(i)}
                        onChange={e => handleClick(e)}
                        className="clickable"
                    />
                    <p className="mc-option-label">{option}</p>
                </div>
            )
        }));
    }, [selected, props.options])

    return (
        <div className="block-container" id="block-container">
            <p className="heading">{props.heading}</p>
            <p className="subheading">{props.subheading}</p>
            <p className={props.required? "required-star":"hidden"}>*</p>
            <div className="mc-options-container">
                {renders}
            </div>
        </div>
    )

    function handleClick(e) {
        let optionVal = parseInt(e.target.value);
        if (selected.includes(optionVal)) {
            setSelected(selected.filter(item => {
                return item !== optionVal;
            }))
        } else {
            setSelected(selected.concat(optionVal));
        }
    }
}

export default MultipleChoice;