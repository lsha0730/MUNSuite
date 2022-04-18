import React, { useRef, useEffect, useState, useContext } from "react";
import { IoClipboard } from "react-icons/io5";
import { editorContext } from '../../../Context.js';
import "./EditorComponents.scoped.css";

// Custom hook that avoids run on initial mount
const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

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
    useEffect(() => {
        if (props.heading) {
            document.getElementById("heading" + props.id).value = props.heading;
        }
        if (props.subheading) {
            document.getElementById("subheading" + props.id).value = props.subheading;
        }
    }, [])

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
            <input type="text" id={"heading" + props.id} placeholder="Input here..." className="textfield-container"></input>

            <p className="subheading">Subheading</p>
            <input type="text" id={"subheading" + props.id} placeholder="Input here..." className="textfield-container"></input>

        </div>
    )
}

function EditRadio(props) {
    const [require, setRequire] = useState(props.required);
    const [toggleRender, setToggleRender] = useState();
    const [options, setOptions] = useState(props.options)
    const [optionsRender, setOptionsRender] = useState([]);
    const [heading, setHeading] = useState(props.heading);
    const [subheading, setSubheading] = useState(props.subheading);
    //const {formArr, setFormArr} = useContext(editorContext);

    useEffect(() => {
        console.log("bruh!")
        // Debugging, delete later
    }, [props.formArr])

    useEffect(() => {
        if (props.heading) {
            document.getElementById("heading" + props.id).value = props.heading;
        }
        if (props.subheading) {
            document.getElementById("subheading" + props.id).value = props.subheading;
        }
    }, [])

    // Form Updater
    // useEffect(() => {
    //     let newObj = {}
    //     newObj.id = props.id;
    //     newObj.type = "radio";
    //     newObj.required = require;
    //     newObj.heading = heading==""? false:heading;
    //     newObj.subheading = subheading==""? false:subheading;
    //     newObj.options = options;

    //     let newForm = props.formArr;
    //     // why has the value already been set to the header?
    //     // object not yet declared.
    //     // TODO
    //     console.log(newForm)
    //     console.log(props.id)
    //     // newForm.splice(props.id, 1, newObj);
    //     console.log(newForm);
    //     props.setForm(newForm);
        
    //     // Add timing based optimization to prevent setState on every keystorke
    //     console.log("internal update") //Debug
    // }, [require, options, heading, subheading])


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
        if (document.getElementById("radio" + props.id).value !== "") {
            setOptions(options.concat(document.getElementById("radio" + props.id).value))
            document.getElementById("radio" + props.id).value = "";
        }
    }

    function removeOption(target) {
        let newArr = [];
        for (let i=0; i<options.length; i++) {
            if (i !== target) {
                newArr.push(options[i])
            }
        }
        setOptions(newArr);
    }

    useEffect(() => {
        if (options.length == 0) {
            setOptionsRender(<p className="option-none-ind">No options yet!</p>)
        } else {
            let renderArr = [];
            for (let i=0; i<options.length; i++) {
                renderArr.push(
                    <div className="option-container" onClick={() => removeOption(i)}>
                        <div className="overflow-wrapper">
                            <p className="option-text">{options[i]}</p>
                        </div>
                    </div>
                )
            }
            setOptionsRender(renderArr);
        }
    }, [options])

    return (
        <div className="block-container">
            <p className="heading" onClick={() => props.setForm()}>Radio Buttons</p>
            {toggleRender}

            <p className="subheading">Heading</p>
            <input type="text" id={"heading" + props.id} placeholder="Input here..." className="textfield-container" onChange={() => {setHeading(document.getElementById("heading" + props.id).value)}}></input>

            <p className="subheading">Subheading</p>
            <input type="text" id={"subheading" + props.id} placeholder="Input here..." className="textfield-container" onChange={() => setSubheading(document.getElementById("subheading" + props.id).value)}></input>

            <p className="subheading">Options</p>
            <div className="radio-options-container">
                {optionsRender}

                <div className="option-adder">
                    <input type="text" id={"radio" + props.id} className="option-input"></input>
                    <div className="btt-add-option" onClick={addOption}>
                        <p>Add</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function EditMultipleChoice(props) {
    const [require, setRequire] = useState(props.required);
    const [toggleRender, setToggleRender] = useState();
    const [options, setOptions] = useState(props.options)
    const [optionsRender, setOptionsRender] = useState([]);

    useEffect(() => {
        if (props.heading) {
            document.getElementById("heading" + props.id).value = props.heading;
        }
        if (props.subheading) {
            document.getElementById("subheading" + props.id).value = props.subheading;
        }
    }, [])

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
        if (document.getElementById("mc" + props.id).value !== "") {
            setOptions(options.concat(document.getElementById("mc" + props.id).value))
            document.getElementById("mc" + props.id).value = "";
        }
    }

    function removeOption(target) {
        let newArr = [];
        for (let i=0; i<options.length; i++) {
            if (i !== target) {
                newArr.push(options[i])
            }
        }
        setOptions(newArr);
    }

    useEffect(() => {
        if (options.length == 0) {
            setOptionsRender(<p className="option-none-ind">No options yet!</p>)
        } else {
            let renderArr = [];
            for (let i=0; i<options.length; i++) {
                renderArr.push(
                    <div className="option-container" onClick={() => removeOption(i)}>
                        <div className="overflow-wrapper">
                            <p className="option-text">{options[i]}</p>
                        </div>
                    </div>
                )
            }
            setOptionsRender(renderArr);
        }
    }, [options])


    return (
        <div className="block-container">
            <p className="heading">Multiple Choice</p>
            {toggleRender}

            <p className="subheading">Heading</p>
            <input type="text" id={"heading" + props.id} placeholder="Input here..." className="textfield-container"></input>

            <p className="subheading">Subheading</p>
            <input type="text" id={"subheading" + props.id} placeholder="Input here..." className="textfield-container"></input>

            <p className="subheading">Options</p>
            <div className="mc-options-container">
                {optionsRender}

                <div className="option-adder">
                    <input type="text" id={"mc" + props.id} className="option-input"></input>
                    <div className="btt-add-option" onClick={addOption}>
                        <p>Add</p>
                    </div>
                </div>
            </div>
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
    const [require, setRequire] = useState(props.required);
    const [toggleRender, setToggleRender] = useState();

    useEffect(() => {
        if (props.heading) {
            document.getElementById("heading" + props.id).value = props.heading;
        }
        if (props.subheading) {
            document.getElementById("subheading" + props.id).value = props.subheading;
        }
    }, [])

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
            <input type="text" id={"heading" + props.id} placeholder="Input here..." className="textfield-container"></input>

            <p className="subheading">Subheading</p>
            <input type="text" id={"subheading" + props.id} placeholder="Input here..." className="textfield-container"></input>
        </div>
    )
}

function EditLongText(props) {
    const [require, setRequire] = useState(props.required);
    const [toggleRender, setToggleRender] = useState();

    useEffect(() => {
        if (props.heading) {
            document.getElementById("heading" + props.id).value = props.heading;
        }
        if (props.subheading) {
            document.getElementById("subheading" + props.id).value = props.subheading;
        }
    }, [])

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
            <input type="text" id={"heading" + props.id} placeholder="Input here..." className="textfield-container"></input>

            <p className="subheading">Subheading</p>
            <input type="text" id={"subheading" + props.id} placeholder="Input here..." className="textfield-container"></input>
        </div>
    )
}

function EditDropdown(props) {
    const [require, setRequire] = useState(props.required);
    const [toggleRender, setToggleRender] = useState();
    const [options, setOptions] = useState(props.options)
    const [optionsRender, setOptionsRender] = useState([]);

    useEffect(() => {
        if (props.heading) {
            document.getElementById("heading" + props.id).value = props.heading;
        }
        if (props.subheading) {
            document.getElementById("subheading" + props.id).value = props.subheading;
        }
    }, [])

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
        if (document.getElementById("dropdown" + props.id).value !== "") {
            setOptions(options.concat(document.getElementById("dropdown" + props.id).value))
            document.getElementById("dropdown" + props.id).value = "";
        }
    }

    function removeOption(target) {
        let newArr = [];
        for (let i=0; i<options.length; i++) {
            if (i !== target) {
                newArr.push(options[i])
            }
        }
        setOptions(newArr);
    }

    useEffect(() => {
        if (options.length == 0) {
            setOptionsRender(<p className="option-none-ind">No options yet!</p>)
        } else {
            let renderArr = [];
            for (let i=0; i<options.length; i++) {
                renderArr.push(
                    <div className="option-container" onClick={() => removeOption(i)}>
                        <div className="overflow-wrapper">
                            <p className="option-text">{options[i]}</p>
                        </div>
                    </div>
                )
            }
            setOptionsRender(renderArr);
        }
    }, [options])


    return (
        <div className="block-container">
            <p className="heading">Dropdown</p>
            {toggleRender}

            <p className="subheading">Heading</p>
            <input type="text" id={"heading" + props.id} placeholder="Input here..." className="textfield-container"></input>

            <p className="subheading">Subheading</p>
            <input type="text" id={"subheading" + props.id} placeholder="Input here..." className="textfield-container"></input>

            <p className="subheading">Options</p>
            <div className="dropdown-options-container">
                {optionsRender}

                <div className="option-adder">
                    <input type="text" id={"dropdown" + props.id} className="option-input"></input>
                    <div className="btt-add-option" onClick={addOption}>
                        <p>Add</p>
                    </div>
                </div>
            </div>
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