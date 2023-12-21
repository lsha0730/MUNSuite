import React, { useEffect, useState } from "react";
import "./PreviewComponents.scoped.css";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const MultipleChoice = ({
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
}) => {
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
        className="block-container"
        id="block-container"
        onClick={() => {
          if (setEditing) setEditing(id);
        }}
      >
        {variant === "staff" && (
          <div className={editing == id ? "editing-indicator" : "fade"} />
        )}
        <p className="heading">{heading}</p>
        <p className="subheading">{subheading}</p>
        <p className={required ? "required-star" : "hidden"}>*</p>
        <div className="mc-options-container">
          {options.map((option, index) => (
            <div className="mc-single-container">
              <input
                type="checkbox"
                value={index}
                checked={selected.includes(index)}
                onChange={(e) => handleClick(e)}
                className="clickable"
              />
              <p className="mc-option-label">{option}</p>
            </div>
          ))}
        </div>
      </div>

      {variant === "staff" && (
        <div id="Qmod-icons">
          <div onClick={() => updateForm("move-up", id)}>
            <IoIosArrowUp className="btt-moveQ" />
          </div>
          <div onClick={() => updateForm("move-down", id)}>
            <IoIosArrowDown className="btt-moveQ" />
          </div>
          <div onClick={() => updateForm("delete", id)}>
            <FaTrash className="btt-delQ" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleChoice;
