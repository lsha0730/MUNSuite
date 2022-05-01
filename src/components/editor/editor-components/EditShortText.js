import React, { useEffect, useState, useRef } from "react";
import "./EditorComponents.scoped.css";

function EditShortText(props) {
    const [require, setRequire] = useState(props.required);
    const [toggleRender, setToggleRender] = useState();
    const [heading, setHeading] = useState(props.heading);
    const [subheading, setSubheading] = useState(props.subheading);
    const isMounted = useRef(false);

    useEffect(() => {
        if (props.heading) {
            document.getElementById("heading" + props.id).value = props.heading;
        }
        if (props.subheading) {
            document.getElementById("subheading" + props.id).value = props.subheading;
        }
    }, [])

    useEffect(() => {
        let toggleOffset = require? 20:0;

        setToggleRender(
            <div className="toggle-set" onClick={() => setRequire(!require)}>
                <p className={require? "toggle-text-red":"toggle-text-grey"}>{require? "Required":"Optional"}</p>
                <div className={require? "toggle-bar toggle-redbg":"toggle-bar toggle-greybg"}>
                    <div className={require? "toggle-circle toggle-redbtt":"toggle-circle toggle-greybtt"} style={{left: toggleOffset}}></div>
                </div>
            </div>
        )
    }, [require])

    // Form Updater
    useEffect(() => {
        if (isMounted.current) {
            let newObj = {}
            newObj.id = props.id;
            newObj.type = "shorttext";
            newObj.required = require;
            newObj.heading = heading==""? false:heading;
            newObj.subheading = subheading==""? false:subheading;

            props.updateForm("update", props.id, newObj);
        } else {
            isMounted.current = true;
        }
    }, [require, heading, subheading])

    return (
        <div className={props.editing==props.id? "block-container":"hidden"}>
            <p className="heading">Short Text</p>
            {toggleRender}

            <p className="subheading">Heading</p>
            <input type="text" id={"heading" + props.id} placeholder="Input here..." className="textfield-container" onChange={() => {setHeading(document.getElementById("heading" + props.id).value)}}></input>

            <p className="subheading">Subheading</p>
            <input type="text" id={"subheading" + props.id} placeholder="Input here..." className="textfield-container" onChange={() => {setSubheading(document.getElementById("subheading" + props.id).value)}}></input>
        </div>
    )
}

export default EditShortText;