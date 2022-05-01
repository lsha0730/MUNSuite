import React, { useState, useEffect } from "react";
import "./Editor.scoped.css";
import DefaultFormData from "./DefaultFormData.js";
import { IoIosArrowDroprightCircle } from "react-icons/io";

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
    const [editing, setEditing] = useState(false);
    const [formRender, setFormRender] = useState([]);
    const [formLink, setFormLink] = useState("https://forms.gle/jEErPPyXrHJ3YEpz8");

    function updateForm(operation, index, newObj = null) {
        let tempArr = formArr.slice();
        switch (operation) {
            case "delete":
                tempArr.splice(index, 1);
                for (let i = 0; i<formArr.length-1; i++) {
                    tempArr[i].id = i;
                }
                break;
            case "update":
                tempArr.splice(index, 1, newObj);
                break;
            case "move-up":
                if (tempArr[index - 1]) {
                    let tempObj = tempArr[index - 1];
                    tempArr[index - 1] = tempArr[index];
                    tempArr[index] = tempObj;

                    for (let i = 0; i<formArr.length; i++) {
                        tempArr[i].id = i;
                    }

                    if (editing == index) setEditing(editing - 1);
                }
                break;
            case "move-down":
                if (tempArr[index + 1]) {
                    let tempObj = tempArr[index + 1];
                    tempArr[index + 1] = tempArr[index];
                    tempArr[index] = tempObj;

                    for (let i = 0; i<formArr.length; i++) {
                        tempArr[i].id = i;
                    }

                    if (editing == index) setEditing(editing + 1)
                }
                break;
        }
        setFormArr(tempArr);
    }

    function addNewBlock(type) {
        let tempArr = formArr.slice();
        let newObj = {}
        newObj.id = formArr.length;
        newObj.type = type;
        newObj.heading = `New ${type}`;
        newObj.subheading = false;

        switch (type) {
            case "header":
                newObj.image = require("./defaultBanner.png");
                break;
            case "radio":
                newObj.required = false;
                newObj.options = ["Option 1", "Option 2", "Option 3"];
                break;
            case "multiplechoice":
                newObj.required = false;
                newObj.options = ["Option 1", "Option 2", "Option 3"];
                break;
            case "content":
                break;
            case "shorttext":
                newObj.required = false;
                break;
            case "longtext":
                newObj.required = false;
                break;
            case "dropdown":
                newObj.required = false;
                newObj.options = ["Option 1", "Option 2", "Option 3"];
                break;
            case "select-multiple":
                newObj.required = false;
                newObj.options = ["Option 1", "Option 2", "Option 3"];
                newObj.max = false;
                break;
            default:
                console.log("Could not render form block.")
        }

        tempArr.push(newObj);
        console.log(tempArr);
        setFormArr(tempArr);
    }

    useEffect(() => {
        console.log("form rerendered")
        setFormRender(formArr.map(item => {
            switch (item.type) {
                case "header":
                    return (
                        <div className="preview-editor-pair">
                            <Header key={item.id} id={item.id} image={item.image} heading={item.heading} subheading={item.subheading} editing={editing} setEditing={setEditing} updateForm={updateForm}/>
                            <EditHeader key={`editor${item.id}`} id={item.id} image={item.image} heading={item.heading} subheading={item.subheading} editing={editing} updateForm={updateForm}/>
                        </div>
                    )
                case "radio":
                    return (
                        <div className="preview-editor-pair">
                            <Radio key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options} editing={editing} setEditing={setEditing} updateForm={updateForm}/>
                            <EditRadio key={`editor${item.id}`} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options} editing={editing} updateForm={updateForm}/>
                        </div>
                    )
                case "multiplechoice":
                    return (
                        <div className="preview-editor-pair">
                            <MultipleChoice key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options} editing={editing} setEditing={setEditing} updateForm={updateForm}/>
                            <EditMultipleChoice key={`editor${item.id}`} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options} editing={editing} updateForm={updateForm}/>
                        </div>
                    )
                case "content":
                    return (
                        <div className="preview-editor-pair">
                            <Content key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} content={item.content} editing={editing} setEditing={setEditing} updateForm={updateForm}/>
                            <EditContent key={`editor${item.id}`} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} content={item.content} editing={editing} updateForm={updateForm}/>
                        </div>
                    )
                case "shorttext":
                    return (
                        <div className="preview-editor-pair">
                            <ShortText key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} editing={editing} setEditing={setEditing} updateForm={updateForm}/>
                            <EditShortText key={`editor${item.id}`} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} editing={editing} updateForm={updateForm}/>
                        </div>
                    )
                case "longtext":
                    return (
                        <div className="preview-editor-pair">
                            <LongText key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} editing={editing} setEditing={setEditing} updateForm={updateForm}/>
                            <EditLongText key={`editor${item.id}`} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} editing={editing} updateForm={updateForm}/>
                        </div>
                    )
                case "dropdown":
                    return (
                        <div className="preview-editor-pair">
                            <Dropdown key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options} editing={editing} setEditing={setEditing} updateForm={updateForm}/>
                            <EditDropdown key={`editor${item.id}`} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options} editing={editing} updateForm={updateForm}/>
                        </div>
                    )
                case "select-multiple":
                    return (
                        <div className="preview-editor-pair">
                            <SelectMultiple key={item.id} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} max={item.max} options={item.options} editing={editing} setEditing={setEditing} updateForm={updateForm}/>
                            <EditSelectMultiple key={`editor${item.id}`} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} max={item.max} options={item.options} editing={editing} updateForm={updateForm}/>
                        </div>
                    )
                default:
                    console.log("Could not render form block.")
            }
        }))
    }, [formArr, editing]);

    return (
        <div className="editor-container">
            <div className="main-UI">
                <div className="preview-hat">
                    <p className="preview-hat-heading">DISEC</p>
                    <p className="preview-hat-subheading">[Delegation Name]</p>
                </div>

                {formRender}

                <div className="addQ-container">
                    <div className="addQ-icon-container">
                        <div className="addQ-icon-backdrop"></div>
                        <IoIosArrowDroprightCircle className="addQ-icon"/>
                    </div>
                    <div className="addQ-options-container">
                        <div className="btt-addQ" onClick={()=>addNewBlock("shorttext")}>Short Text</div>
                        <div className="btt-addQ" onClick={()=>addNewBlock("longtext")}>Long Text</div>
                        <div className="btt-addQ" onClick={()=>addNewBlock("radio")}>Radio</div>
                        <div className="btt-addQ" onClick={()=>addNewBlock("multiplechoice")}>Multiple Choice</div>
                        <div className="btt-addQ" onClick={()=>addNewBlock("select-multiple")}>Select Multiple</div>
                        <div className="btt-addQ" onClick={()=>addNewBlock("dropdown")}>Dropdown</div>
                        <div className="btt-addQ" onClick={()=>addNewBlock("content")}>Content Block</div>
                        <div className="btt-addQ" onClick={()=>addNewBlock("header")}>Header</div>
                    </div>
                </div>
            </div>
            {/* <FormLink link={formLink}/> */}
        </div>
    )
}

export default Editor;