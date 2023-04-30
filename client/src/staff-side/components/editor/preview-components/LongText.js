import React, { useRef, useState } from "react";
import styles from "./PreviewComponents.module.css";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function LongText({
  variant,
  id,
  required,
  heading,
  subheading,
  maxchars,
  editing,
  setEditing,
  updateForm,
  updateSubmission,
  locked,
}) {
  const [textState, setTextState] = useState("");
  const textareaRef = useRef();

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
        <textarea
          ref={textareaRef}
          type="text"
          placeholder="Input here..."
          className={styles.longtext_input}
          onChange={(e) => {
            const currLen = e.target.value.length;
            if (maxchars && currLen > maxchars) {
              e.target.value = e.target.value.slice(0, maxchars);
            }
            setTextState(e.target.value);
            if (updateSubmission) updateSubmission(id, e.target.value);
          }}
        />
        {maxchars && (
          <p className={styles.maxchar_count}>{`${
            textState.length
          } / ${maxchars || "Unlimited"} Max`}</p>
        )}
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

export default LongText;
