import React from "react";
import styles from "./PreviewComponents.module.css";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Content({
  variant,
  id,
  required,
  heading,
  subheading,
  content,
  editing,
  setEditing,
  updateForm,
  locked,
}) {
  const storage = getStorage();

  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <div
        className={styles.block_container}
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
        <p className={styles.heading}>{heading}</p>
        <p className={styles.subheading}>{subheading}</p>
        <p className={required ? styles.required_star : styles.hidden}>*</p>
        {(content || []).map((item) => {
          switch (item.type) {
            case "text":
              return (
                <div className={styles.content_item_container}>
                  <p className={styles.content_heading}>{item.heading}</p>
                  <p>{item.value}</p>
                </div>
              );
            case "image":
              return (
                <div className={styles.content_item_container}>
                  <p className={styles.content_heading}>{item.heading}</p>
                  <div>
                    <img
                      src={item.value}
                      alt="Content Image"
                      className={styles.content_image}
                    />
                  </div>
                </div>
              );
          }
        })}
      </div>

      {variant === "staff" && (
        <div id={styles.Qmod_icons}>
          <div onClick={() => updateForm("move-up", id)}>
            <IoIosArrowUp className={styles.btt_moveQ} />
          </div>
          <div onClick={() => updateForm("move-down", id)}>
            <IoIosArrowDown className={styles.btt_moveQ} />
          </div>
          <div
            onClick={() => {
              deleteContentFiles();
              updateForm("delete", id);
            }}
          >
            <FaTrash className={styles.btt_delQ} />
          </div>
        </div>
      )}
    </div>
  );

  function deleteContentFiles() {
    content.forEach((item) => {
      if (item.type == "image" && item.path !== "") {
        deleteObject(ref(storage, item.path));
      }
    });
  }
}

export default Content;
