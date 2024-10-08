import { useRef, useState } from "react";
import "./PreviewComponents.scoped.css";
import QmodButtons from "./qmod_buttons/QmodButtons";

const LongText = ({
  variant,
  id,
  required,
  heading,
  subheading,
  maxchars,
  editing,
  setEditing,
  updateForm,
  updateSubmission = null,
}) => {
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
              e.target.value = e.target.value.slice(0, maxchars);
            }
            setTextState(e.target.value);
            if (updateSubmission) updateSubmission(id, e.target.value);
          }}
        />
        {Boolean(maxchars) && (
          <p className="maxchar-count">{`${textState.length} / ${maxchars ||
            "Unlimited"} Max`}</p>
        )}
      </div>

      {variant === "staff" && <QmodButtons id={id} onClick={updateForm} />}
    </div>
  );
};

export default LongText;
