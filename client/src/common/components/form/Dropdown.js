import { useEffect, useState } from "react";
import "./PreviewComponents.scoped.css";
import { GoTriangleDown } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FormOperation } from "../../types/types";

const Dropdown = ({
  variant,
  id,
  required,
  heading,
  subheading,
  options,
  editing,
  setEditing,
  updateForm,
  updateSubmission = null,
}) => {
  const [value, setValue] = useState(null); // Stores the index of the item in options
  const [dropVisible, setDropVisible] = useState(false);
  const sortedOptions = options.sort((a, b) => a.label.localeCompare(b.label));

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
            <p className="dropdown-selection-text">{options[value]?.label}</p>
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
                    <p className="nowrap">{option.label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {variant === "staff" && (
        <div id="Qmod-icons">
          <div onClick={() => updateForm(FormOperation.MoveUp, id)}>
            <IoIosArrowUp className="btt-moveQ" />
          </div>
          <div onClick={() => updateForm(FormOperation.MoveDown, id)}>
            <IoIosArrowDown className="btt-moveQ" />
          </div>
          <div onClick={() => updateForm(FormOperation.Delete, id)}>
            <FaTrash className="btt-delQ" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
