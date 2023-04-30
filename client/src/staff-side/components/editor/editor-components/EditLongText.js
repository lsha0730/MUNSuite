import React, { useEffect, useState, useRef } from "react";
import styles from "./EditorComponents.module.css";

const MAX_CHAR_LIMIT = 10000;

function EditLongText(props) {
  const [require, setRequire] = useState(props.required);
  const [toggleRender, setToggleRender] = useState();
  const [heading, setHeading] = useState(props.heading);
  const [subheading, setSubheading] = useState(props.subheading);
  const [maxchars, setMaxchars] = useState(props.maxchars);
  const isMounted = useRef(false);

  const headingRef = useRef();
  const subheadingRef = useRef();
  const maxcharsRef = useRef();

  useEffect(() => {
    if (props.heading && headingRef.current) {
      headingRef.current.value = props.heading;
    }
    if (props.subheading && subheadingRef.current) {
      subheadingRef.current.value = props.subheading;
    }
    if (props.maxchars && maxcharsRef.current) {
      maxcharsRef.current.value = props.maxchars;
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
      newObj.type = "longtext";
      newObj.required = require;
      newObj.heading = heading == "" ? false : heading;
      newObj.subheading = subheading == "" ? false : subheading;
      newObj.maxchars = !maxchars ? false : maxchars;

      props.updateForm("update", props.id, newObj);
    } else {
      isMounted.current = true;
    }
  }, [require, heading, subheading, maxchars]);

  return (
    <div
      className={
        props.editing == props.id ? styles.block_container : styles.hidden
      }
    >
      <p className={styles.heading}>Long Text</p>
      {toggleRender}

      <p className={styles.subheading}>Heading</p>
      <input
        ref={headingRef}
        type="text"
        placeholder="Input here..."
        className={styles.textfield_container}
        onChange={(e) => {
          setHeading(e.target.value);
        }}
      />

      <p className={styles.subheading}>Subheading</p>
      <input
        ref={subheadingRef}
        type="text"
        placeholder="Input here..."
        className={styles.textfield_container}
        onChange={(e) => {
          setSubheading(e.target.value);
        }}
      />

      <p className={styles.subheading}>Max Characters</p>
      <input
        ref={maxcharsRef}
        type="number"
        min="1"
        max={`${MAX_CHAR_LIMIT}`}
        placeholder="No Limit"
        className={styles.textfield_container}
        onChange={(e) => {
          if (e.target.value > MAX_CHAR_LIMIT) e.target.value = MAX_CHAR_LIMIT;
          setMaxchars(
            Math.min(parseInt(e.target.value), MAX_CHAR_LIMIT) || false
          );
        }}
      />
    </div>
  );
}

export default EditLongText;
