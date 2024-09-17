import "./PreviewComponents.scoped.css";
import QmodButtons from "./qmod_buttons/QmodButtons";

const ShortText = ({
  variant,
  id,
  required,
  heading,
  subheading,
  editing,
  setEditing,
  updateForm,
  updateSubmission = null,
}) => {
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

      {variant === "staff" && <QmodButtons id={id} onClick={updateForm} />}
    </div>
  );
};

export default ShortText;
