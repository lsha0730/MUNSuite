import React, { useEffect, useState } from "react";
import styles from "./PreviewComponents.module.css";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosLock } from "react-icons/io";

function Radio({
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
  const [selected, setSelected] = useState(); // Stores the index of selected in options

  useEffect(() => {
    if (variant === "delegate" && updateSubmission) {
      updateSubmission(id, options[selected] || "No Selection");
    }
  }, [selected]);

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
        <p className={styles.heading}>{heading}</p>
        <p className={styles.subheading}>{subheading}</p>
        <p className={required ? styles.required_star : styles.hidden}>*</p>
        <div className={styles.radio_options_container}>
          {options.map((option, index) => (
            <div className={styles.radio_single_container}>
              <input
                type="radio"
                value={index}
                checked={selected == index}
                onChange={(e) => {
                  setSelected(e.target.value);
                }}
                className={styles.clickable}
              />
              <p className={styles.radio_option_label}>{option}</p>
            </div>
          ))}
        </div>
      </div>

      {variant === "staff" &&
        (locked ? (
          <div className={styles.locked_icon_container}>
            <IoIosLock className={styles.locked_icon} />
          </div>
        ) : (
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
        ))}
    </div>
  );
}

export default Radio;
