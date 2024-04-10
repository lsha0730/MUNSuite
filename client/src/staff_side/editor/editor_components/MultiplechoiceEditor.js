import React, { useEffect, useState, useRef } from "react";
import "./QEditor.scoped.css";
import { Toggle } from "../../../common/components/input";
import { FormOperation } from "../../../common/types/types";

function MultiplechoiceEditor(props) {
  const [require, setRequire] = useState(props.required);
  const [options, setOptions] = useState(props.options);
  const [optionsRender, setOptionsRender] = useState([]);
  const [heading, setHeading] = useState(props.heading);
  const [subheading, setSubheading] = useState(props.subheading);
  const isMounted = useRef(false);

  useEffect(() => {
    if (props.heading) {
      document.getElementById("heading" + props.id).value = props.heading;
    }
    if (props.subheading) {
      document.getElementById("subheading" + props.id).value = props.subheading;
    }
  }, []);

  function addOption() {
    if (document.getElementById("mc" + props.id).value !== "") {
      setOptions(
        options.concat(document.getElementById("mc" + props.id).value)
      );
      document.getElementById("mc" + props.id).value = "";
    }
  }

  function removeOption(target) {
    let newArr = [];
    for (let i = 0; i < options.length; i++) {
      if (i !== target) {
        newArr.push(options[i]);
      }
    }
    setOptions(newArr);
  }

  useEffect(() => {
    if (options.length == 0) {
      setOptionsRender(<p className="option-none-ind">No options yet!</p>);
    } else {
      let renderArr = [];
      for (let i = 0; i < options.length; i++) {
        renderArr.push(
          <div className="option-container" onClick={() => removeOption(i)}>
            <div className="overflow-wrapper">
              <p className="option-text">{options[i]}</p>
            </div>
          </div>
        );
      }
      setOptionsRender(renderArr);
    }
  }, [options]);

  // Form Updater
  useEffect(() => {
    if (isMounted.current) {
      let newObj = {};
      newObj.id = props.id;
      newObj.type = "multiplechoice";
      newObj.required = require;
      newObj.heading = heading == "" ? false : heading;
      newObj.subheading = subheading == "" ? false : subheading;
      newObj.options = options;

      props.updateForm(FormOperation.Update, props.id, newObj);
    } else {
      isMounted.current = true;
    }
  }, [require, options, heading, subheading]);

  return (
    <div className={props.editing == props.id ? "block-container" : "hidden"}>
      <p className="heading">Multiple Choice</p>
      <Toggle
        size="small"
        color="red"
        value={require}
        onValue={setRequire}
        label={{
          on: "Required",
          off: "Optional",
          direction: "left",
        }}
        style={{ position: "absolute", top: 20, right: 35, cursor: "pointer" }}
      />

      <p className="subheading">Heading</p>
      <input
        type="text"
        id={"heading" + props.id}
        placeholder="Input here..."
        className="textfield-container"
        onChange={() => {
          setHeading(document.getElementById("heading" + props.id).value);
        }}
      />

      <p className="subheading">Subheading</p>
      <input
        type="text"
        id={"subheading" + props.id}
        placeholder="Input here..."
        className="textfield-container"
        onChange={() => {
          setSubheading(document.getElementById("subheading" + props.id).value);
        }}
      />

      <p className="subheading">Options</p>

      <div className="option-adder">
        <input
          type="text"
          id={"mc" + props.id}
          className="option-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") addOption();
          }}
        />
        <div className="btt-add-option" onClick={addOption}>
          <p>Add</p>
        </div>
      </div>
      <div className="options-container">{optionsRender}</div>
    </div>
  );
}

export default MultiplechoiceEditor;
