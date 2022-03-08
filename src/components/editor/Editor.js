import React, { useState, useEffect } from "react";
import "./Editor.scoped.css";

import DefaultFormData from "./DefaultFormData.js";
import { Header, Radio, MultipleChoice, Content, ShortText, LongText, Dropdown, SelectMultiple } from "./preview-components/PreviewComponents.js";
import { FormLink, EditHeader, EditRadio, EditMultipleChoice, EditContent, EditShortText, EditLongText, EditDropdown, EditSelectMultiple } from "./editor-components/EditorComponents.js";

function Editor() {
    const [formArr, setFormArr] = useState(DefaultFormData);
    const [previewRenders, setPreviewRenders] = useState([]);
    const [editorRenders, setEditorRenders] = useState([]);
    const [formLink, setFormLink] = useState("https://forms.gle/jEErPPyXrHJ3YEpz8dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");

    useEffect(() => {
        setPreviewRenders(formArr.map(item => {
            switch (item.type) {
                case "header":
                    return <Header key={item.id} image={item.image} heading={item.heading} subheading={item.subheading}/>;
                case "radio":
                    return <Radio key={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options}/>;
                case "multiplechoice":
                    return <MultipleChoice key={item.id} required={item.required} heading={item.heading} options={item.options}/>;
                case "content":
                    return <Content key={item.id} required={item.required} heading={item.heading} subheading={item.subheading} content={item.content}/>;
                case "shorttext":
                    return <ShortText key={item.id} required={item.required} heading={item.heading} subheading={item.subheading}/>;
                case "longtext":
                    return <LongText key={item.id} required={item.required} heading={item.heading} subheading={item.subheading}/>;
                case "dropdown":
                    return <Dropdown key={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options}/>;
                case "select-multiple":
                    return <SelectMultiple key={item.id} required={item.required} heading={item.heading} subheading={item.subheading} max={item.max} options={item.options}/>;
                default:
                    console.log("Could not render question block.")
            }
        }))

        setEditorRenders(formArr.map(item => {
            switch (item.type) {
                case "header":
                    return <EditHeader key={item.id} image={item.image} heading={item.heading} subheading={item.subheading}/>;
                case "radio":
                    return <EditRadio key={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options}/>;
                case "multiplechoice":
                    return <EditMultipleChoice key={item.id} required={item.required} heading={item.heading} options={item.options}/>;
                case "content":
                    return <EditContent key={item.id} required={item.required} heading={item.heading} subheading={item.subheading} content={item.content}/>;
                case "shorttext":
                    return <EditShortText key={item.id} required={item.required} heading={item.heading} subheading={item.subheading}/>;
                case "longtext":
                    return <EditLongText key={item.id} required={item.required} heading={item.heading} subheading={item.subheading}/>;
                case "dropdown":
                    return <EditDropdown key={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options}/>;
                case "select-multiple":
                    return <EditSelectMultiple key={item.id} required={item.required} heading={item.heading} subheading={item.subheading} max={item.max} options={item.options}/>;
                default:
                    console.log("Could not render editor block.")
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
                <FormLink link={formLink}/>
                {editorRenders}
            </div>
        </div>
    )
}

export default Editor;