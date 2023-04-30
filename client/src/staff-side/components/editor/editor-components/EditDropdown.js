import React, { useEffect, useState, useContext, useRef } from "react";
import { appContext } from "../../../staffContext";
import styles from "./EditorComponents.module.css";

function EditDropdown(props) {
  const { delegations } = useContext(appContext);
  const [delNames, setDelNames] = useState(delegations.map((del) => del.name));
  const [require, setRequire] = useState(props.required);
  const [toggleRender, setToggleRender] = useState();
  const [useDels, setUseDels] = useState(props.options == "all-delegations");
  const [options, setOptions] = useState([]);
  const [optionsRender, setOptionsRender] = useState([]);
  const [heading, setHeading] = useState(props.heading);
  const [subheading, setSubheading] = useState(props.subheading);
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
  }, []);

  useEffect(() => {
    let toggleOffset = require ? 20 : 0;

    setToggleRender(
      <div className={styles.toggle_set} onClick={() => setRequire(!require)}>
        <p
          className={require ? styles.toggle_text_red : styles.toggle_text_grey}
        >
          {require ? "Required" : "Optional"}
        </p>
        <div
          className={`${styles.toggle_bar} ${
            require ? styles.toggle_redbg : styles.toggle_greybg
          }`}
        >
          <div
            className={`${styles.toggle_circle} ${
              require ? styles.toggle_redbtt : styles.toggle_greybtt
            }`}
            style={{ left: toggleOffset }}
          />
        </div>
      </div>
    );
  }, [require]);

  function addOption() {
    if (document.getElementById("dropdown" + props.id).value !== "") {
      setOptions(
        options.concat(document.getElementById("dropdown" + props.id).value)
      );
      document.getElementById("dropdown" + props.id).value = "";
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
    document.getElementById("dropdown" + props.id).value = "";
  }

  useEffect(() => {
    if (options.length == 0) {
      setOptionsRender(
        <p className={styles.option_none_ind}>No options yet!</p>
      );
    } else {
      let renderArr = [];
      for (let i = 0; i < options.length; i++) {
        renderArr.push(
          <div
            className={
              useDels
                ? styles.option_container_bricked
                : styles.option_container
            }
            onClick={() => removeOption(i)}
          >
            <div className={styles.overflow_wrapper}>
              <p className={styles.option_text}>{options[i]}</p>
            </div>
          </div>
        );
      }
      setOptionsRender(renderArr);
    }
  }, [options, useDels]);

  // Form Updater
  useEffect(() => {
    if (isMounted.current) {
      let newObj = {};
      newObj.id = props.id;
      newObj.type = "dropdown";
      newObj.required = require;
      newObj.heading = heading == "" ? false : heading;
      newObj.subheading = subheading == "" ? false : subheading;
      newObj.options = useDels ? "all-delegations" : options;

      props.updateForm("update", props.id, newObj);
    } else {
      isMounted.current = true;
    }
  }, [require, options, heading, subheading, useDels]);

  return (
    <div
      className={
        props.editing == props.id ? styles.block_container : styles.hidden
      }
    >
      <p className={styles.heading}>Dropdown</p>
      {toggleRender}

      <p className={styles.subheading}>Heading</p>
      <input
        type="text"
        id={"heading" + props.id}
        placeholder="Input here..."
        className={styles.textfield_container}
        onChange={() =>
          setHeading(document.getElementById("heading" + props.id).value)
        }
      />

      <p className={styles.subheading}>Subheading</p>
      <input
        type="text"
        id={"subheading" + props.id}
        placeholder="Input here..."
        className={styles.textfield_container}
        onChange={() =>
          setSubheading(document.getElementById("subheading" + props.id).value)
        }
      />

      <p className={styles.subheading}>Options</p>

      <div className={styles.option_adder}>
        <input
          type="text"
          id={"dropdown" + props.id}
          className={
            useDels ? styles.option_input_bricked : styles.option_input
          }
          disabled={useDels}
          onKeyDown={(e) => {
            if (e.key === "Enter") addOption();
          }}
        />
        <div
          className={
            useDels ? styles.btt_add_option_bricked : styles.btt_add_option
          }
          onClick={addOption}
        >
          <p>Add</p>
        </div>
        <div
          className={`${styles.btt_add_all} ${
            useDels ? styles.btt_add_all_on : styles.btt_add_all_off
          }`}
          onClick={toggleUseAll}
        >
          <p>Use Dels</p>
        </div>
      </div>

      <div
        className={`${styles.options_container} ${
          useDels ? styles.options_container_bricked : styles.options_container
        }`}
      >
        {optionsRender}
      </div>
    </div>
  );
}

export default EditDropdown;
