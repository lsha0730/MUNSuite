import React, { useEffect, useState } from "react";
import "./EditorComponents.scoped.css";

function EditHeader(props) {
    const [heading, setHeading] = useState(props.heading);
    const [subheading, setSubheading] = useState(props.subheading);

    useEffect(() => {
        if (props.heading) {
            document.getElementById("heading" + props.id).value = props.heading;
        }
        if (props.subheading) {
            document.getElementById("subheading" + props.id).value = props.subheading;
        }
    }, [])

    // Form Updater
    useEffect(() => {
        let newObj = {}
        newObj.id = props.id;
        newObj.type = "header";
        newObj.image = props.image;
        newObj.heading = heading==""? false:heading;
        newObj.subheading = subheading==""? false:subheading;

        props.updateForm(false, props.id, newObj);
    }, [heading, subheading])

    return (
        <div className="block-container">
            <p className="heading">Header</p>

            <p className="subheading">Image</p>
            <div className="header-imgbar-n-btt">
                <div className="header-imgsrc-container">
                    <div className="overflow-wrapper">
                        <p>{props.image}</p>
                    </div>
                </div>
                <div className="header-btt-upload">
                    <p>+ Upload</p>
                </div>
            </div>

            <p className="subheading">Heading</p>
            <input type="text" id={"heading" + props.id} placeholder="Input here..." className="textfield-container" onChange={() => {setHeading(document.getElementById("heading" + props.id).value)}}></input>

            <p className="subheading">Subheading</p>
            <input type="text" id={"subheading" + props.id} placeholder="Input here..." className="textfield-container" onChange={() => {setSubheading(document.getElementById("subheading" + props.id).value)}}></input>

        </div>
    )
}

export default EditHeader;