import { useEffect, useState } from "react";
import "./PreviewComponents.scoped.css";
import QmodButtons from "./qmod_buttons/QmodButtons";

const Radio = ({
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
  const [selected, setSelected] = useState(); // Stores the index of selected in options

  useEffect(() => {
    if (variant === "delegate" && updateSubmission) {
      updateSubmission(id, options[selected] || "No Selection");
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
        <div className="radio-options-container">
          {options.map(({ label }, index) => (
            <div className="radio-single-container">
              <input
                type="radio"
                value={index}
                checked={selected == index}
                onChange={(e) => {
                  setSelected(e.target.value);
                }}
                className="clickable"
              />
              <p className="radio-option-label">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {variant === "staff" && <QmodButtons id={id} onClick={updateForm} />}
    </div>
  );
};

export default Radio;
