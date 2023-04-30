import React, { useEffect, useState, useRef } from "react";
import styles from "./EditorComponents.module.css";

function EditShortText(props) {
  const [require, setRequire] = useState(props.required);
  const [toggleRender, setToggleRender] = useState();
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

  // Form Updater
  useEffect(() => {
    if (isMounted.current) {
      let newObj = {};
      newObj.id = props.id;
      newObj.type = "shorttext";
      newObj.required = require;
      newObj.heading = heading == "" ? false : heading;
      newObj.subheading = subheading == "" ? false : subheading;

      props.updateForm("update", props.id, newObj);
    } else {
      isMounted.current = true;
    }
  }, [require, heading, subheading]);

  return (
    <div
      className={
        props.editing == props.id ? styles.block_container : styles.hidden
      }
    >
      <p className={styles.heading}>Short Text</p>
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
        className={styles.textfield_container}
        placeholder="Input here..."
        onChange={() => {
          setSubheading(document.getElementById("subheading" + props.id).value);
        }}
      />
    </div>
  );
}

export default EditShortText;
