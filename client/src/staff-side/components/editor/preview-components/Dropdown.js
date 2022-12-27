import React, { useEffect, useState } from "react";
import "./PreviewComponents.scoped.css";
import { GoTriangleDown } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Dropdown({
  variant,
  key,
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
        className="block-container"
        id="block-container"
        onClick={() => {
          if (setEditing) setEditing(id);
        }}
      >
        {variant === "staff" && (
          <div className={editing == id ? "editing-indicator" : "fade"} />
        )}
        <div
          className={dropVisible ? "dropdown-defocuser" : "hidden"}
          onClick={() => setDropVisible(false)}
        />
        <p className="heading">{heading}</p>
        <p className="subheading">{subheading}</p>
        <p className={required ? "required-star" : "hidden"}>*</p>
        <div
          className={dropVisible ? "dropdown-bar super-z" : "dropdown-bar"}
          onClick={() => setDropVisible(!dropVisible)}
        >
          <div className="dropdown-text-container">
            <p className="dropdown-selection-text">{options[value]}</p>
          </div>
          <GoTriangleDown size={10} className="dropdown-triangle" />
          {dropVisible && (
            <div className="dropdown-field">
              {sortedOptions.map((option, index) => (
                <div
                  className="dropdown-option-container"
                  onClick={() => {
                    setDropVisible(!dropVisible);
                    setValue(index);
                  }}
                >
                  <div className="dropdown-text-container">
                    <p className="nowrap">{option}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
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
}

export default Dropdown;
