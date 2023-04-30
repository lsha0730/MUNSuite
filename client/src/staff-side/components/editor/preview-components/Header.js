import React from "react";
import styles from "./PreviewComponents.module.css";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosLock } from "react-icons/io";

function Header({
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
}) {
  const storage = getStorage();

  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <div
        className={styles.header_container}
        id={styles.block_container}
        onClick={() => {
          if (setEditing) setEditing(id);
        }}
      >
        {variant === "staff" && (
          <div
            className={editing == id ? styles.editing_indicator : styles.fade}
          />
        )}
        <img src={imgLink} alt="form-banner" className={styles.header_image} />
        <div className={styles.header_text_container}>
          <p className={styles.header_heading}>{heading}</p>
          <p className={styles.header_subheading}>{subheading}</p>
        </div>
      </div>

      {variant === "staff" &&
        (locked ? (
          <div className={styles.locked_icon_container}>
            <IoIosLock className={styles.locked_icon} />
          </div>
        ) : (
          <div id={styles.Qmod_icons}>
            <div onClick={() => updateForm("move-up", id)}>
              <IoIosArrowUp className={styles.btt_moveQ} />
            </div>
            <div onClick={() => updateForm("move-down", id)}>
              <IoIosArrowDown className={styles.btt_moveQ} />
            </div>
            <div
              onClick={() => {
                deleteImageFile();
                updateForm("delete", id);
              }}
            >
              <FaTrash className={styles.btt_delQ} />
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
}

export default Header;
