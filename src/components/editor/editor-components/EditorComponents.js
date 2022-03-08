import React, { useEffect, useState } from "react";
import { IoClipboard } from "react-icons/io5";
import "./EditorComponents.scoped.css";

function FormLink(props) {
    const [isDisplayingConfirmation, setIsDisplayingConfirmation] = useState(false);

    function copyLink() {
        navigator.clipboard.writeText(props.link);
        setIsDisplayingConfirmation(true);
        setTimeout(() => setIsDisplayingConfirmation(false), 1000);
    }

    return (
        <div className="block-container">
            <p className="heading">Form Link</p>
            <div className="formlink-container">
                <div className="formlink-link-container">
                    <div className="overflow-wrapper"><p>{props.link}</p></div>
                </div>
                <IoClipboard size={26} className="formlink-icon" onClick={copyLink}/>
            </div>
            <div className={isDisplayingConfirmation? "formlink-confirmation-container":"formlink-confirmation-container fade"}>
                <p className="formlink-confirmation-text">Copied!</p>
            </div>
        </div>
    )
}

function EditHeader(props) {
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
            <input type="text" placeholder="Input here..." className="textfield-container"></input>

            <p className="subheading">Subheading</p>
            <input type="text" placeholder="Input here..." className="textfield-container"></input>

        </div>
    )
}

function EditRadio(props) {
    const [require, setRequire] = useState(false);
    const [toggleRender, setToggleRender] = useState();
    const [options, setOptions] = useState(["Bruh!", "Moment!"])
    const [optionsRender, setOptionsRender] = useState([]);

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

    function addOption() {
        setOptions(options.concat(document.getElementById("option-adder").value))
        document.getElementById("option-adder").value = "";
    }

    function removeOption(target) { //!!! Need to make this index based
        setOptions(options.filter(item => {
            return item !== target;
        }))
    }

    useEffect(() => {
        if (options.length == 0) {
            setOptionsRender(<p className="option-none-ind">No options yet!</p>)
        } else {
            setOptionsRender(options.map(item => {
                return (
                    <div className="option-container" onClick={() => removeOption(item)}>
                        <div className="overflow-wrapper">
                            <p className="option-text">{item}</p>
                        </div>
                    </div>
                )
            }))
        }
    }, [options])


    return (
        <div className="block-container">
            <p className="heading">Radio Buttons</p>
            {toggleRender}

            <p className="subheading">Heading</p>
            <input type="text" placeholder="Input here..." className="textfield-container"></input>

            <p className="subheading">Subheading</p>
            <input type="text" placeholder="Input here..." className="textfield-container"></input>

            <p className="subheading">Options</p>
            <div className="radio-options-container">
                {optionsRender}

                <div className="option-adder">
                    <input type="text" id="option-adder" className="option-input"></input>
                    <div className="btt-add-option" onClick={addOption}>
                        <p>Add Option</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function EditMultipleChoice(props) {
    const [require, setRequire] = useState(false);
    const [toggleRender, setToggleRender] = useState();

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

    return (
        <div className="block-container">
            <p className="heading">Multiple Choice</p>
            {toggleRender}

            <p className="subheading">Heading</p>
            <input type="text" placeholder="Input here..." className="textfield-container"></input>

            <p className="subheading">Subheading</p>
            <input type="text" placeholder="Input here..." className="textfield-container"></input>

            <p className="subheading">Options</p>
            <div className="mc-options-container"></div>
        </div>
    )
}

function EditContent(props) {
    return (
        <div className="block-container">
            <p className="heading">Content Block</p>
            <div className="dummy-block"></div>
        </div>
    )
}

function EditShortText(props) {
    const [require, setRequire] = useState(false);
    const [toggleRender, setToggleRender] = useState();

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

    return (
        <div className="block-container">
            <p className="heading">Short Text</p>
            {toggleRender}

            <p className="subheading">Heading</p>
            <input type="text" placeholder="Input here..." className="textfield-container"></input>

            <p className="subheading">Subheading</p>
            <input type="text" placeholder="Input here..." className="textfield-container"></input>
        </div>
    )
}

function EditLongText(props) {
    const [require, setRequire] = useState(false);
    const [toggleRender, setToggleRender] = useState();

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

    return (
        <div className="block-container">
            <p className="heading">Long Text</p>
            {toggleRender}

            <p className="subheading">Heading</p>
            <input type="text" placeholder="Input here..." className="textfield-container"></input>

            <p className="subheading">Subheading</p>
            <input type="text" placeholder="Input here..." className="textfield-container"></input>
        </div>
    )
}

function EditDropdown(props) {
    const [require, setRequire] = useState(false);
    const [toggleRender, setToggleRender] = useState();

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

    return (
        <div className="block-container">
            <p className="heading">Dropdown</p>
            {toggleRender}

            <p className="subheading">Heading</p>
            <input type="text" placeholder="Input here..." className="textfield-container"></input>

            <p className="subheading">Subheading</p>
            <input type="text" placeholder="Input here..." className="textfield-container"></input>

            <p className="subheading">Options</p>
            <div className="dropdown-options-container"></div>
        </div>
    )
}


function EditSelectMultiple(props) {
    const [require, setRequire] = useState(false);
    const [toggleRender, setToggleRender] = useState();

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

    return (
        <div className="block-container">
            <p className="heading">Multiple Select</p>
            {toggleRender}

            <div className="dummy-block"></div>
        </div>
    )
}


export { FormLink, EditHeader, EditRadio, EditMultipleChoice, EditContent, EditShortText, EditLongText, EditDropdown, EditSelectMultiple };