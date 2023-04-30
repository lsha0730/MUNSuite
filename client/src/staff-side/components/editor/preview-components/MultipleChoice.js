import React, { useEffect, useState } from "react";
import styles from "./PreviewComponents.module.css";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function MultipleChoice({
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
  const [selected, setSelected] = useState([]); // Stores the indices of selected in options

  function handleClick(e) {
    let optionVal = parseInt(e.target.value);
    if (selected.includes(optionVal)) {
      setSelected(
        selected.filter((item) => {
          return item !== optionVal;
        })
      );
    } else {
      setSelected(selected.concat(optionVal));
    }
  }

  useEffect(() => {
    if (variant === "delegate" && updateSubmission) {
      let resultArr = selected.map((index) => options[index]);
      updateSubmission(id, resultArr.length > 0 ? resultArr : ["No Selection"]);
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
        <div className={styles.mc_options_container}>
          {options.map((option, index) => (
            <div className={styles.mc_single_container}>
              <input
                type="checkbox"
                value={index}
                checked={selected.includes(index)}
                onChange={(e) => handleClick(e)}
                className={styles.clickable}
              />
              <p className={styles.mc_option_label}>{option}</p>
            </div>
          ))}
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

export default MultipleChoice;
