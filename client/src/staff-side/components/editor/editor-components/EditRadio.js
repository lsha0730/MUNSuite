import React, { useEffect, useState, useRef } from "react";
import styles from "./EditorComponents.module.css";

function EditRadio(props) {
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
      setOptionsRender(
        <p className={styles.option_none_ind}>No options yet!</p>
      );
    } else {
      let renderArr = [];
      for (let i = 0; i < options.length; i++) {
        renderArr.push(
          <div
            className={styles.option_container}
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
  }, [options]);

  return (
    <div
      className={
        props.editing == props.id ? styles.block_container : styles.hidden
      }
    >
      <p className={styles.heading}>Radio Buttons</p>
      {toggleRender}

      <p className={styles.subheading}>Heading</p>
      <input
        type="text"
        id={"heading" + props.id}
        className={
          props.locked
            ? styles.textfield_container_bricked
            : styles.textfield_container
        }
        disabled={props.locked}
        placeholder="Input here..."
        onChange={() => {
          setHeading(document.getElementById("heading" + props.id).value);
        }}
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
          id={"radio" + props.id}
          className={styles.option_input}
          onKeyDown={(e) => {
            if (e.key === "Enter") addOption();
          }}
        />
        <div className={styles.btt_add_option} onClick={addOption}>
          <p>Add</p>
        </div>
      </div>

      <div className={styles.options_container}>{optionsRender}</div>
    </div>
  );
}

export default EditRadio;
