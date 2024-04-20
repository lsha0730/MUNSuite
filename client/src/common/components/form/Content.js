import "./PreviewComponents.scoped.css";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { ContentType } from "../../types/questionTypes";
import QmodButtons from "./qmod_buttons/QmodButtons";
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

  function deleteContentFiles() {
    if (!content) return;
    content.forEach(({ value }) => {
      if (value.type == ContentType.Image && value.path !== "") {
        deleteObject(ref(storage, item.path));
      }
    });
  }

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
            case ContentType.Text:
              return (
                <div className="content-item-container">
                  <p className="content-heading">{item.heading}</p>
                  <p>{item.value}</p>
                </div>
              );
            case ContentType.Image:
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
        <QmodButtons
          id={id}
          onClick={(op, id) => {
            if (op === FormOperation.Delete) deleteContentFiles();
            updateForm(op, id);
          }}
        />
      )}
    </div>
  );
};

export default Content;
