import "./PreviewComponents.scoped.css";
import { getStorage, ref, deleteObject } from "firebase/storage";
import QmodButtons from "./qmod_buttons/QmodButtons";
import { FormOperation } from "../../types/types";

const Header = ({
  variant,
  id,
  image,
  heading,
  subheading,
  editing,
  setEditing,
  updateForm,
}) => {
  const storage = getStorage();

  function deleteImageFile() {
    if (image.path !== "") {
      deleteObject(ref(storage, image.path));
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <div
        className="header-container"
        id="block-container"
        onClick={() => {
          if (setEditing) setEditing(id);
        }}
      >
        {variant === "staff" && (
          <div className={editing == id ? "editing-indicator" : "fade"} />
        )}
        <img src={image.link} alt="form-banner" className="header-image" />
        <div className="header-text-container">
          <p className="header-heading">{heading}</p>
          <p className="header-subheading">{subheading}</p>
        </div>
      </div>

      {variant === "staff" && (
        <QmodButtons
          id={id}
          onClick={(op, id) => {
            if (op === FormOperation.Delete) deleteImageFile();
            updateForm(op, id);
          }}
        />
      )}
    </div>
  );
};

export default Header;
