import React from "react";
import "./PreviewComponents.scoped.css";

function Content(props) {
    let contentRenders = [];
    for (let i=0; i<props.content.length; i++) {
        let itemObj = props.content[i];
        switch (itemObj.type) {
            case "text":
                contentRenders.push(
                    <div className="content-item-container">
                        <p className="content-heading">{itemObj.heading}</p>
                        <p>{itemObj.value}</p>
                    </div>);
                break;
            case "image":
                contentRenders.push(
                    <div className="content-item-container">
                        <p className="content-heading">{itemObj.heading}</p>
                        <div>
                            <img src={itemObj.value} alt="Content Image" className="content-image"/>
                        </div>
                    </div>);
        }
    }

    return (
        <div className="block-container" id="block-container">
            <p className="heading">{props.heading}</p>
            <p className="subheading">{props.subheading}</p>
            <p className={props.required? "required-star":"hidden"}>*</p>
            {contentRenders}
        </div>
    )
}

export default Content;