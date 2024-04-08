import React from "react";
import "./PreviewComponents.scoped.css";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosLock } from "react-icons/io";
import { FormOperation } from "../../types/types";

const Header = ({
  variant,
  id,
  imgPath,
  imgLink,
  heading,
  subheading,
  editing,
  setEditing,
  updateForm,
  locked,
}) => {
  const storage = getStorage();

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
        <img src={imgLink} alt="form-banner" className="header-image" />
        <div className="header-text-container">
          <p className="header-heading">{heading}</p>
          <p className="header-subheading">{subheading}</p>
        </div>
      </div>

      {variant === "staff" &&
        (locked ? (
          <div className="locked-icon-container">
            <IoIosLock className="locked-icon" />
          </div>
        ) : (
          <div id="Qmod-icons">
            <div onClick={() => updateForm(FormOperation.MoveUp, id)}>
              <IoIosArrowUp className="btt-moveQ" />
            </div>
            <div onClick={() => updateForm(FormOperation.MoveDown, id)}>
              <IoIosArrowDown className="btt-moveQ" />
            </div>
            <div
              onClick={() => {
                deleteImageFile();
                updateForm(FormOperation.Delete, id);
              }}
            >
              <FaTrash className="btt-delQ" />
            </div>
          </div>
        ))}
    </div>
  );

  function deleteImageFile() {
    if (imgPath !== "") {
      deleteObject(ref(storage, imgPath));
    }
  }
};

export default Header;
