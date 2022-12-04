import React, { useEffect, useState } from "react";
import "./PreviewComponents.scoped.css";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function MultipleChoice(props) {
  const [selected, setSelected] = useState([]); // Stores the indices of selected in props.options
  const [renders, setRenders] = useState([]);

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
    let i = -1;
    setRenders(
      props.options.map((option) => {
        i++;
        return (
          <div className="mc-single-container">
            <input
              type="checkbox"
              value={i}
              checked={selected.includes(i)}
              onChange={(e) => handleClick(e)}
              className="clickable"
            />
            <p className="mc-option-label">{option}</p>
          </div>
        );
      })
    );
  }, [selected, props.options]);

  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <div
        className="block-container"
        id="block-container"
        onClick={() => props.setEditing(props.id)}
      >
        <div
          className={props.editing == props.id ? "editing-indicator" : "fade"}
        ></div>
        <p className="heading">{props.heading}</p>
        <p className="subheading">{props.subheading}</p>
        <p className={props.required ? "required-star" : "hidden"}>*</p>
        <div className="mc-options-container">{renders}</div>
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

export default MultipleChoice;
