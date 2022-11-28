import React, {useState, useEffect} from "react";
import { GoTriangleDown } from "react-icons/go";
import "./History.scoped.css";

function Dropdown({ options, setSelection, ...other }) {
    const [value, setValue] = useState(0); // Stores the index of the item in options
    const [dropVisible, setDropVisible] = useState(false);
    const [dropRender, setDropRender] = useState();

    let optionRenders = [];
    for (let i=0; i<options.length; i++) {
        let option = options[i];
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

    useEffect(() => {
        setSelection(options[value]);
    }, [value])

    return (
        <div {...other}>
            <div className={dropVisible? "dropdown-defocuser":"hidden"} onClick={() => setDropVisible(false)}></div>
            <div className={dropVisible? "dropdown-bar super-z":"dropdown-bar"} onClick={() => setDropVisible(!dropVisible)}>
                <div className="dropdown-text-container">
                    <p className="nowrap">{options[value]}</p>
                </div>
                <GoTriangleDown size={10} className="dropdown-triangle"/>
                {dropRender}
            </div>
        </div>
    )
}

export default Dropdown;