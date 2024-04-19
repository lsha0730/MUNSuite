import "./PreviewComponents.scoped.css";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FormOperation } from "../../types/types";

const Content = ({
  variant,
  id,
  heading,
  subheading,
  content,
  editing,
  setEditing,
  updateForm,
}) => {
  const storage = getStorage();

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
        {(content || []).map((item) => {
          switch (item.type) {
            case "text":
              return (
                <div className="content-item-container">
                  <p className="content-heading">{item.heading}</p>
                  <p>{item.value}</p>
                </div>
              );
            case "image":
              return (
                <div className="content-item-container">
                  <p className="content-heading">{item.heading}</p>
                  <div>
                    <img
                      src={item.value.link}
                      alt="Content Image"
                      className="content-image"
                    />
                  </div>
                </div>
              );
          }
        })}
      </div>

      {variant === "staff" && (
        <div id="Qmod-icons">
          <div onClick={() => updateForm(FormOperation.MoveUp, id)}>
            <IoIosArrowUp className="btt-moveQ" />
          </div>
          <div onClick={() => updateForm(FormOperation.MoveDown, id)}>
            <IoIosArrowDown className="btt-moveQ" />
          </div>
          <div
            onClick={() => {
              deleteContentFiles();
              updateForm(FormOperation.Delete, id);
            }}
          >
            <FaTrash className="btt-delQ" />
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
};

export default Content;
