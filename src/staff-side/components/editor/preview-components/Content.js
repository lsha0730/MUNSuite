import React from "react";
import "./PreviewComponents.scoped.css";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Content(props) {
    const storage = getStorage();

    let contentRenders = (props.content || []).map(item => {
        switch (item.type) {
            case "text":
                return (
                    <div className="content-item-container">
                        <p className="content-heading">{item.heading}</p>
                        <p>{item.value}</p>
                    </div>);
                break;
            case "image":
                return (
                    <div className="content-item-container">
                        <p className="content-heading">{item.heading}</p>
                        <div>
                            <img src={item.value} alt="Content Image" className="content-image"/>
                        </div>
                    </div>);
        }
    })

    return (
        <div style={{display: "flex", flexDirection: "row-reverse"}}>
            <div className="block-container" id="block-container" onClick={()=>props.setEditing(props.id)}>
                <div className={props.editing==props.id? "editing-indicator":"fade"}></div>
                <p className="heading">{props.heading}</p>
                <p className="subheading">{props.subheading}</p>
                <p className={props.required? "required-star":"hidden"}>*</p>
                {contentRenders}
            </div>

            <div id="Qmod-icons">
                <div onClick={() => props.updateForm("move-up", props.id)}><IoIosArrowUp className="btt-moveQ"/></div>
                <div onClick={() => props.updateForm("move-down", props.id)}><IoIosArrowDown className="btt-moveQ"/></div>
                <div onClick={() => {deleteContentFiles(); props.updateForm("delete", props.id)}}><FaTrash className="btt-delQ"/></div>
            </div>
        </div>
    )

    function deleteContentFiles() {
        props.content.forEach(item => {
            if (item.type == "image" && item.path !== "") {
                deleteObject(ref(storage, item.path));
            }
        })
    }
}

export default Content;