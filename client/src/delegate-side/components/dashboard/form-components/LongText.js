import React, { useState } from "react";
import "./PreviewComponents.scoped.css";

function LongText(props) {
  const [textState, setTextState] = useState("");

  return (
    <div className="block-container" id="block-container">
      <p className="heading">{props.heading}</p>
      <p className="subheading">{props.subheading}</p>
      <p className={props.required ? "required-star" : "hidden"}>*</p>
      <textarea
        type="text"
        placeholder="Input here..."
        className="longtext-input"
        onChange={(e) => {
          const currLen = e.target.value.length;
          if (props.maxchars && currLen > props.maxchars) {
            e.target.value = e.target.value.slice(0, currLen - 1);
          }
          setTextState(e.target.value);
          props.updateSubmission(props.id, e.target.value);
        }}
      />
      {props.maxchars && (
        <p className="maxchar-count">{`${textState.length} / ${props.maxchars ||
          "Unlimited"} Max`}</p>
      )}
    </div>
  );
}

export default LongText;
