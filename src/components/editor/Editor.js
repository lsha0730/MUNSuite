import React, { useState, useEffect } from "react";
import "./Editor.scoped.css";

import DefaultFormData from "./DefaultFormData.js";
import { Header, Radio, MultipleChoice, Content, ShortText, LongText, Dropdown, DropdownMultiple } from "./preview-components/PreviewComponents.js";

function Editor() {
    const [formArr, setFormArr] = useState(DefaultFormData);
    const [previewRenders, setPreviewRenders] = useState([]);

    useEffect(() => {
        setPreviewRenders(formArr.map(item => {
            switch (item.type) {
                case "header":
                    return <Header key={item.id} required={item.required} image={item.image} heading={item.heading} subheading={item.subheading}/>;
                case "radio":
                    return <Radio key={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options}/>;
                case "multiplechoice":
                    return <MultipleChoice key={item.id} required={item.required} heading={item.heading} options={item.options}/>;
                case "content":
                    return <Content key={item.id} required={item.required} heading={item.heading} subheading={item.subheading} text={item.text} image={item.image}/>;
                case "shorttext":
                    return <ShortText key={item.id} required={item.required} heading={item.heading} subheading={item.subheading}/>;
                case "longtext":
                    return <LongText key={item.id} required={item.required} heading={item.heading} subheading={item.subheading}/>;
                case "dropdown":
                    return <Dropdown key={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options}/>;
                case "dropdown-multiple":
                    return <DropdownMultiple key={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options}/>;
                default:
                    console.log("Could not render question block.")
            }
        }))

    }, [formArr]);

    return (
        <div className="editor-container">
            <div className="UI-left"> 
                <div className="preview-container">
                    <div className="preview-hat">
                        <p className="preview-hat-heading">DISEC</p>
                        <p className="preview-hat-subheading">[Delegation Name]</p>
                    </div>
                    {previewRenders}
                    <div className="btt-submit-block">
                        <div className="btt-submit">
                            <p>Submit</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="UI-right">

            </div>
        </div>
    )
}

export default Editor;