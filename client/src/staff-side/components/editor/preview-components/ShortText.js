import React from "react";
import "./PreviewComponents.scoped.css";
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
        <input
          type="text"
          placeholder="Input here..."
          className="shorttext-input"
          onChange={(e) => {
            if (updateSubmission) updateSubmission(id, e.target.value);
          }}
        />
      </div>

      {variant === "staff" &&
        (locked ? (
          <div className="locked-icon-container">
            <IoIosLock className="locked-icon" />
          </div>
        ) : (
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
        ))}
    </div>
  );
}

export default ShortText;
