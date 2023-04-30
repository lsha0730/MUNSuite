import React, { useEffect, useState } from "react";
import styles from "./PreviewComponents.module.css";
import { GoTriangleDown } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Dropdown({
  variant,
  id,
  required,
  heading,
  subheading,
  options,
  editing,
  setEditing,
  updateForm,
  updateSubmission,
  locked,
}) {
  const [value, setValue] = useState(); // Stores the index of the item in options
  const [dropVisible, setDropVisible] = useState(false);
  const sortedOptions = options.sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    if (variant === "delegate" && updateSubmission) {
      updateSubmission(id, options[value] || "No Selection");
    }
  }, [value]);

  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <div
        className={styles.block_container}
        id={styles.block_container}
        onClick={() => {
          if (setEditing) setEditing(id);
        }}
      >
        {variant === "staff" && (
          <div
            className={editing == id ? styles.editing_indicator : styles.fade}
          />
        )}
        <div
          className={dropVisible ? styles.dropdown_defocuser : styles.hidden}
          onClick={() => setDropVisible(false)}
        />
        <p className={styles.heading}>{heading}</p>
        <p className={styles.subheading}>{subheading}</p>
        <p className={required ? styles.required_star : styles.hidden}>*</p>
        <div
          className={
            dropVisible
              ? `${styles.dropdown_bar} ${styles.super_z}`
              : styles.dropdown_bar
          }
          onClick={() => setDropVisible(!dropVisible)}
        >
          <div className={styles.dropdown_text_container}>
            <p className={styles.dropdown_selection_text}>{options[value]}</p>
          </div>
          <GoTriangleDown size={10} className={styles.dropdown_triangle} />
          {dropVisible && (
            <div className={styles.dropdown_field}>
              {sortedOptions.map((option, index) => (
                <div
                  className={styles.dropdown_option_container}
                  onClick={() => {
                    setDropVisible(!dropVisible);
                    setValue(index);
                  }}
                >
                  <div className={styles.dropdown_text_container}>
                    <p className={styles.nowrap}>{option}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {variant === "staff" && (
        <div id={styles.Qmod_icons}>
          <div onClick={() => updateForm("move-up", id)}>
            <IoIosArrowUp className={styles.btt_moveQ} />
          </div>
          <div onClick={() => updateForm("move-down", id)}>
            <IoIosArrowDown className={styles.btt_moveQ} />
          </div>
          <div onClick={() => updateForm("delete", id)}>
            <FaTrash className={styles.btt_delQ} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
