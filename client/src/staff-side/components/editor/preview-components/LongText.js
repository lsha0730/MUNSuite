import React, { useRef, useState } from "react";
import "./PreviewComponents.scoped.css";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function LongText({
  variant,
  key,
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
        <textarea
          ref={textareaRef}
          type="text"
          placeholder="Input here..."
          className="longtext-input"
          onChange={(e) => {
            const currLen = e.target.value.length;
            if (maxchars && currLen > maxchars) {
              e.target.value = e.target.value.slice(0, currLen - 1);
            }
            setTextState(e.target.value);
            if (updateSubmission) updateSubmission(id, e.target.value);
          }}
        />
        {maxchars && (
          <p className="maxchar-count">{`${textState.length} / ${maxchars ||
            "Unlimited"} Max`}</p>
        )}
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

export default LongText;
