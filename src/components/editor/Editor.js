import React, { useState, useEffect } from "react";
import "./Editor.scoped.css";

import DefaultFormData from "./DefaultFormData.js";
import { Header, Radio, MultipleChoice, Content, ShortText, LongText, Dropdown, DropdownMultiple } from "./preview-components/PreviewComponents.js";

function Editor() {
    const [previewArr, setPreviewArr] = useState(DefaultFormData);
    const [previewRenders, setPreviewRenders] = useState([]);

    useEffect(() => {
        setPreviewRenders(previewArr.map(item => {
            switch (item.type) {
                case "header":
                    return <Header id={item.id} required={item.required} image={item.image} heading={item.heading} subheading={item.subheading}/>;
                case "radio":
                    return <Radio id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options}/>;
                case "multiplechoice":
                    return <MultipleChoice id={item.id} required={item.required} heading={item.heading} options={item.options}/>;
                case "content":
                    return <Content id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} text={item.text} image={item.image}/>;
                case "shorttext":
                    return <ShortText id={item.id} required={item.required} heading={item.heading} subheading={item.subheading}/>;
                case "longtext":
                    return <LongText id={item.id} required={item.required} heading={item.heading} subheading={item.subheading}/>;
                case "dropdown":
                    return <Dropdown id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options}/>;
                case "dropdown-multiple":
                    return <DropdownMultiple id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options}/>;
                default:
                    console.log("Could not render question block.")
            }
        }))

    }, [previewArr]);

    return (
        <div className="editor-container">
            <div className="UI-left"> 
                <div className="preview-container">
                    <div className="preview-hat">
                        <p className="preview-hat-heading">DISEC</p>
                        <p className="preview-hat-subheading">[Delegation Name]</p>
                    </div>
                    {previewRenders}
                </div>
            </div>
            <div className="UI-right">

            </div>
        </div>
    )
}

export default Editor;