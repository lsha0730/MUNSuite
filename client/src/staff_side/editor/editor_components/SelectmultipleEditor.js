import React, { useEffect, useState, useContext, useRef } from "react";
import { staffContext } from "../../../common/Context";
import "./Generic.scoped.css";
import Toggle from "../../../common/components/toggle/Toggle";

function SelectmultipleEditor(props) {
  const { delegations } = useContext(staffContext);
  const [delNames, setDelNames] = useState(delegations.map((del) => del.name));
  const [require, setRequire] = useState(props.required);
  const [useDels, setUseDels] = useState(props.options == "all-delegations");
  const [options, setOptions] = useState([]);
  const [optionsRender, setOptionsRender] = useState([]);
  const [heading, setHeading] = useState(props.heading);
  const [subheading, setSubheading] = useState(props.subheading);
  const [maxcount, setMaxcount] = useState(props.max);
  const isMounted = useRef(false);

  useEffect(() => {
    setDelNames(delegations.map((del) => del.name));
    setOptions(
      props.options == "all-delegations"
        ? delegations.map((item) => item.name)
        : props.options
    );
  }, [delegations]);

  useEffect(() => {
    if (props.heading) {
      document.getElementById("heading" + props.id).value = props.heading;
    }
    if (props.subheading) {
      document.getElementById("subheading" + props.id).value = props.subheading;
    }
    if (props.max) {
      document.getElementById("maxcount" + props.id).value = props.max;
    }
  }, []);

  // Form Updater
  useEffect(() => {
    if (isMounted.current) {
      let newObj = {};
      newObj.id = props.id;
      newObj.type = "select-multiple";
      newObj.required = require;
      newObj.heading = heading == "" ? false : heading;
      newObj.subheading = subheading == "" ? false : subheading;
      newObj.max = maxcount == "" ? false : parseInt(maxcount);
      newObj.options = useDels ? "all-delegations" : options;

      props.updateForm("update", props.id, newObj);
    } else {
      isMounted.current = true;
    }
  }, [require, options, heading, subheading, maxcount, useDels]);

  function addOption() {
    if (
      !useDels &&
      document.getElementById("multipleSelect" + props.id).value !== ""
    ) {
      setOptions(
        options.concat(
          document.getElementById("multipleSelect" + props.id).value
        )
      );
      document.getElementById("multipleSelect" + props.id).value = "";
    }
  }

  function removeOption(target) {
    if (!useDels) {
      let newArr = [];
      for (let i = 0; i < options.length; i++) {
        if (i !== target) {
          newArr.push(options[i]);
        }
      }
      setOptions(newArr);
    }
  }

  function toggleUseAll() {
    if (!useDels) setOptions(delNames);
    setUseDels(!useDels);
    document.getElementById("multipleSelect" + props.id).value = "";
  }

  useEffect(() => {
    if (options.length == 0) {
      setOptionsRender(<p className="option-none-ind">No options yet!</p>);
    } else {
      let renderArr = [];
      for (let i = 0; i < options.length; i++) {
        renderArr.push(
          <div
            className={
              useDels ? "option-container-bricked" : "option-container"
            }
            onClick={() => removeOption(i)}
          >
            <div className="overflow-wrapper">
              <p className="option-text">{options[i]}</p>
            </div>
          </div>
        );
      }
      setOptionsRender(renderArr);
    }
  }, [options, useDels]);

  return (
    <div className={props.editing == props.id ? "block-container" : "hidden"}>
      <p className="heading">Select Multiple</p>
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

      <p className="subheading">Max Selectable</p>
      <input
        type="number"
        min="1"
        id={"maxcount" + props.id}
        placeholder="Unlimited"
        className="textfield-container"
        onChange={() => {
          setMaxcount(document.getElementById("maxcount" + props.id).value);
        }}
      />

      <p className="subheading">Options</p>

      <div className="option-adder">
        <input
          type="text"
          id={"multipleSelect" + props.id}
          className={useDels ? "option-input-bricked" : "option-input"}
          disabled={useDels}
          onKeyDown={(e) => {
            if (e.key === "Enter") addOption();
          }}
        />
        <div
          className={useDels ? "btt-add-option-bricked" : "btt-add-option"}
          onClick={addOption}
        >
          <p>Add</p>
        </div>
        <div
          className={
            useDels
              ? "btt-add-all btt-add-all-on"
              : "btt-add-all btt-add-all-off"
          }
          onClick={toggleUseAll}
        >
          <p>Use Dels</p>
        </div>
      </div>

      <div
        className={
          useDels
            ? "options-container options-container-bricked"
            : "options-container"
        }
      >
        {optionsRender}
      </div>
    </div>
  );
}

export default SelectmultipleEditor;
