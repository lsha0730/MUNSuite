import React from "react";
import "./PreviewComponents.scoped.css";

function LongText(props) {
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
          handleChange(e);
        }}
      ></textarea>
    </div>
  );

  function handleChange(e) {
    props.updateSubmission(props.id, e.target.value);
  }
}

export default LongText;
