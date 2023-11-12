import React, { useEffect, useState, useRef } from "react";
import "./Generic.scoped.css";

function RadioEditor(props) {
  const [require, setRequire] = useState(props.required);
  const [toggleRender, setToggleRender] = useState();
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

  // Form Updater
  useEffect(() => {
    if (isMounted.current) {
      let newObj = {};
      newObj.id = props.id;
      newObj.type = "radio";
      newObj.required = require;
      newObj.heading = heading == "" ? false : heading;
      newObj.subheading = subheading == "" ? false : subheading;
      newObj.options = options;

      props.updateForm("update", props.id, newObj);
    } else {
      isMounted.current = true;
    }
  }, [require, options, heading, subheading]);

  useEffect(() => {
    let toggleOffset = require ? 20 : 0;

    setToggleRender(
      <div className="toggle-set" onClick={() => setRequire(!require)}>
        <p className={require ? "toggle-text-red" : "toggle-text-grey"}>
          {require ? "Required" : "Optional"}
        </p>
        <div
          className={
            require ? "toggle-bar toggle-redbg" : "toggle-bar toggle-greybg"
          }
        >
          <div
            className={
              require
                ? "toggle-circle toggle-redbtt"
                : "toggle-circle toggle-greybtt"
            }
            style={{ left: toggleOffset }}
          />
        </div>
      </div>
    );
  }, [require]);

  function addOption() {
    if (document.getElementById("radio" + props.id).value !== "") {
      setOptions(
        options.concat(document.getElementById("radio" + props.id).value)
      );
      document.getElementById("radio" + props.id).value = "";
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

  return (
    <div className={props.editing == props.id ? "block-container" : "hidden"}>
      <p className="heading">Radio Buttons</p>
      {toggleRender}

      <p className="subheading">Heading</p>
      <input
        type="text"
        id={"heading" + props.id}
        className={
          props.locked ? "textfield-container-bricked" : "textfield-container"
        }
        disabled={props.locked}
        placeholder="Input here..."
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
        onChange={() =>
          setSubheading(document.getElementById("subheading" + props.id).value)
        }
      />

      <p className="subheading">Options</p>

      <div className="option-adder">
        <input
          type="text"
          id={"radio" + props.id}
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

export default RadioEditor;
