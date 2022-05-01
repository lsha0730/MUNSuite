import React from "react";
import "./EditorComponents.scoped.css";

function EditContent(props) {
    return (
        <div className={props.editing==props.id? "block-container":"hidden"}>
            <p className="heading">Content Block</p>
            <div className="dummy-block"></div>
        </div>
    )
}

export default EditContent;