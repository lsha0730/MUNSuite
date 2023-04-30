import React from "react";
import styles from "./PreviewComponents.module.css";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosLock } from "react-icons/io";

function ShortText({
  variant,
  id,
  required,
  heading,
  subheading,
  editing,
  setEditing,
  updateForm,
  updateSubmission,
  locked,
}) {
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
        <input
          type="text"
          placeholder="Input here..."
          className={styles.shorttext_input}
          onChange={(e) => {
            if (updateSubmission) updateSubmission(id, e.target.value);
          }}
        />
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

export default ShortText;
