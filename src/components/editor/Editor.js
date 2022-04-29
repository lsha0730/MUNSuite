import React, { useState, useEffect } from "react";
import "./Editor.scoped.css";
import { editorContext } from '../../Context.js';
import DefaultFormData from "./DefaultFormData.js";

// Preview Imports
import Header from "./preview-components/Header.js";
import Radio from "./preview-components/Radio.js";
import MultipleChoice from "./preview-components/MultipleChoice.js";
import Content from "./preview-components/Content.js";
import ShortText from "./preview-components/ShortText.js";
import LongText from "./preview-components/LongText.js";
import Dropdown from "./preview-components/Dropdown.js";
import SelectMultiple from "./preview-components/SelectMultiple.js";

// Editor Imports
import FormLink from "./editor-components/FormLink.js";
import EditHeader from "./editor-components/EditHeader.js";
import EditRadio from "./editor-components/EditRadio.js";
import EditMultipleChoice from "./editor-components/EditMultipleChoice.js";
import EditContent from "./editor-components/EditContent.js";
import EditShortText from "./editor-components/EditShortText.js";
import EditLongText from "./editor-components/EditLongText.js";
import EditDropdown from "./editor-components/EditDropdown.js";
import EditSelectMultiple from "./editor-components/EditSelectMultiple.js";

function Editor() {
    const [formArr, setFormArr] = useState(DefaultFormData);
    const [previewRenders, setPreviewRenders] = useState([]);
    const [editorRenders, setEditorRenders] = useState([]);
    const [formLink, setFormLink] = useState("https://forms.gle/jEErPPyXrHJ3YEpz8");

    function updateForm(del, index, newObj = null) {
        let tempArr = formArr.slice();
        if (del) {
            tempArr.splice(index, 1);
            for (let i = 0; i<formArr.length; i++) {
                tempArr[i].id = i;
            }
        } else {
            tempArr.splice(index, 1, newObj);
        }
        setFormArr(tempArr);
        
    }

    useEffect(() => {
        setPreviewRenders(formArr.map(item => {
            switch (item.type) {
                case "header":
                    return <Header key={item.id} id={item.id} image={item.image} heading={item.heading} subheading={item.subheading}/>;
                case "radio":
                    return <Radio key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options}/>;
                case "multiplechoice":
                    return <MultipleChoice key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options}/>;
                case "content":
                    return <Content key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} content={item.content}/>;
                case "shorttext":
                    return <ShortText key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading}/>;
                case "longtext":
                    return <LongText key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading}/>;
                case "dropdown":
                    return <Dropdown key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options}/>;
                case "select-multiple":
                    return <SelectMultiple key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} max={item.max} options={item.options}/>;
                default:
                    console.log("Could not render question block.")
            }
        }))

        setEditorRenders(formArr.map(item => {
            switch (item.type) {
                case "header":
                    return <EditHeader key={item.id} id={item.id} image={item.image} heading={item.heading} subheading={item.subheading} updateForm={updateForm}/>;
                case "radio":
                    return <EditRadio key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options} updateForm={updateForm}/>;
                case "multiplechoice":
                    return <EditMultipleChoice key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options} updateForm={updateForm}/>;
                case "content":
                    return <EditContent key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} content={item.content} updateForm={updateForm}/>;
                case "shorttext":
                    return <EditShortText key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} updateForm={updateForm}/>;
                case "longtext":
                    return <EditLongText key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} updateForm={updateForm}/>;
                case "dropdown":
                    return <EditDropdown key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options} updateForm={updateForm}/>;
                case "select-multiple":
                    return <EditSelectMultiple key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} max={item.max} options={item.options} updateForm={updateForm}/>;
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
                    <editorContext.Provider>
                        {previewRenders}
                    </editorContext.Provider>
                    <div className="btt-submit-block">
                        <div className="btt-submit">
                            <p>Submit</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="UI-right">
                <FormLink link={formLink}/>
                <editorContext.Provider value={{formArr, setFormArr}}>
                    {editorRenders}
                </editorContext.Provider>
            </div>
        </div>
    )
}

export default Editor;