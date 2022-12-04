import React, { useContext, useEffect, useState } from "react";
import "./PreviewComponents.scoped.css";
import { GoTriangleDown } from "react-icons/go";
import { delContext } from "../../../DelegateContext";

function Dropdown(props) {
  const { delegations } = useContext(delContext);
  const [value, setValue] = useState(); // Stores the index of the item in props.options
  const [dropVisible, setDropVisible] = useState(false);
  const [dropRender, setDropRender] = useState();
  const options =
    props.options == "all-delegations"
      ? delegations.map((item) => item.name)
      : props.options;

  let optionRenders = [];
  for (let i = 0; i < options.length; i++) {
    let sortedOptions = options.sort((a, b) => a.localeCompare(b));
    let option = sortedOptions[i];
    optionRenders.push(
      <div
        className="dropdown-option-container"
        onClick={() => {
          setDropVisible(!dropVisible);
          setValue(i);
        }}
      >
        <div className="dropdown-text-container">
          <p className="nowrap">{option}</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    props.updateSubmission(props.id, options[value] || "No Selection");
  }, [value]);

  useEffect(() => {
    if (dropVisible) {
      setDropRender(<div className="dropdown-field">{optionRenders}</div>);
    } else {
      setDropRender();
    }
  }, [dropVisible]);

  return (
    <div className="block-container" id="block-container">
      <div
        className={dropVisible ? "dropdown-defocuser" : "hidden"}
        onClick={() => setDropVisible(false)}
      ></div>
      <p className="heading">{props.heading}</p>
      <p className="subheading">{props.subheading}</p>
      <p className={props.required ? "required-star" : "hidden"}>*</p>
      <div
        className={dropVisible ? "dropdown-bar super-z" : "dropdown-bar"}
        onClick={() => setDropVisible(!dropVisible)}
      >
        <div className="dropdown-text-container">
          <p className="dropdown-selection-text">{options[value]}</p>
        </div>
        <GoTriangleDown size={10} className="dropdown-triangle" />
        {dropRender}
      </div>
    </div>
  );
}

export default Dropdown;
