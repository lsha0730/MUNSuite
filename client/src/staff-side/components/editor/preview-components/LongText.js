import React, { useRef, useState } from "react";
import "./PreviewComponents.scoped.css";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function LongText(props) {
  const [textState, setTextState] = useState("");
  const textareaRef = useRef();

  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <div
        className="block-container"
        id="block-container"
        onClick={() => props.setEditing(props.id)}
      >
        <div
          className={props.editing == props.id ? "editing-indicator" : "fade"}
        />
        <p className="heading">{props.heading}</p>
        <p className="subheading">{props.subheading}</p>
        <p className={props.required ? "required-star" : "hidden"}>*</p>
        <textarea
          ref={textareaRef}
          type="text"
          placeholder="Input here..."
          className="longtext-input"
          onChange={(e) => {
            const currLen = e.target.value.length;
            if (props.maxchars && currLen > props.maxchars) {
              e.target.value = e.target.value.slice(0, currLen - 1);
            }
            setTextState(e.target.value);
          }}
        />
        {props.maxchars && (
          <p className="maxchar-count">{`${
            textState.length
          } / ${props.maxchars || "Unlimited"} Max`}</p>
        )}
      </div>

      <div id="Qmod-icons">
        <div onClick={() => props.updateForm("move-up", props.id)}>
          <IoIosArrowUp className="btt-moveQ" />
        </div>
        <div onClick={() => props.updateForm("move-down", props.id)}>
          <IoIosArrowDown className="btt-moveQ" />
        </div>
        <div onClick={() => props.updateForm("delete", props.id)}>
          <FaTrash className="btt-delQ" />
        </div>
      </div>
    </div>
  );
}

export default LongText;
