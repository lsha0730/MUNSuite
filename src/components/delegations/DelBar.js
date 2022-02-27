import React, { useContext } from "react";
import "./DelBar.css";
import { delContext } from "./DelContext.js";

function DelegateBar(props) {
    const {selections, setSelections} = useContext(delContext);

    function handleClick() {
        if (selections.includes(props.name)) {
            setSelections(selections.filter((item) => {
                return item !== props.name;
            }));
        } else {
            setSelections(selections.concat(props.name));
        }
    }

    return (
        <div className={selections.includes(props.name)? "delegate-container-selected":"delegate-container"} onClick={handleClick}>
            <p className="name">{props.name}</p>
            <div className={selections.includes(props.name)? "code-container-selected":"code-container"}>
                <p>{props.code}</p>
            </div>
        </div>
    )
}

export default DelegateBar;