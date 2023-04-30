import React, { useState, useEffect } from "react";
import { GoTriangleDown } from "react-icons/go";
import styles from "./History.module.css";

function Dropdown({ options, setSelection, ...other }) {
  const [value, setValue] = useState(0); // Stores the index of the item in options
  const [dropVisible, setDropVisible] = useState(false);
  const [dropRender, setDropRender] = useState();

  let optionRenders = [];
  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    optionRenders.push(
      <div
        className={styles.dropdown_option_container}
        onClick={() => {
          setDropVisible(!dropVisible);
          setValue(i);
        }}
      >
        <div className={styles.dropdown_text_container}>
          <p className={styles.nowrap}>{option}</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (dropVisible) {
      setDropRender(
        <div className={styles.dropdown_field}>{optionRenders}</div>
      );
    } else {
      setDropRender();
    }
  }, [dropVisible]);

  useEffect(() => {
    setSelection(options[value]);
  }, [value]);

  return (
    <div {...other}>
      <div
        className={dropVisible ? styles.dropdown_defocuser : styles.hidden}
        onClick={() => setDropVisible(false)}
      />
      <div
        className={`${styles.dropdown_bar} ${
          dropVisible ? styles.super_z : ""
        }`}
        onClick={() => setDropVisible(!dropVisible)}
      >
        <div className={styles.dropdown_text_container}>
          <p className={styles.nowrap}>{options[value]}</p>
        </div>
        <GoTriangleDown size={10} className={styles.dropdown_triangle} />
        {dropRender}
      </div>
    </div>
  );
}

export default Dropdown;
