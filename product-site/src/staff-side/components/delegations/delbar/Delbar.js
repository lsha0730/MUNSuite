import React, { useEffect, useState, useContext } from "react";
import "./Delbar.scoped.css";
import { BsCheck } from "react-icons/bs";

function Delbar(props) {
    const [showingCopied, setShowingCopied] = useState(false);

    return (
        <div className="delbar-container">
            <div className={props.selected? "delbar-selected":"delbar"} onClick={() => {props.handleClick(props.delegate)}}>
                <p className="del-name">{props.delegate}</p>
            </div>

            <div className={props.selected? "codebox codebox-selected":"codebox"} onClick={copyCode}>
                <p>{props.code}</p>
            </div>

            <BsCheck size={25} className={showingCopied? "icon":"icon fade"}/>
        </div>
    )

    function copyCode() {
        navigator.clipboard.writeText(props.code);
        setShowingCopied(true);
        setTimeout(() => {setShowingCopied(false)}, 300);
    }
}

export default Delbar;