import React, { useEffect, useState, useRef, useContext } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  listAll,
  deleteObject,
} from "firebase/storage";
import "../Generic.scoped.css";
import "./ContentEditor.scoped.css";
import { TiDeleteOutline } from "react-icons/ti";
import { appContext } from "../../../staffContext";

function ContentEditor(props) {
  const { userID } = useContext(appContext);
  const [heading, setHeading] = useState(props.heading);
  const [subheading, setSubheading] = useState(props.subheading);
  const [contentArr, setContentArr] = useState(props.content);
  const [contentRender, setContentRender] = useState();
  const isMounted = useRef(false);
  const storage = getStorage();

  useEffect(() => {
    setContentRender(
      (contentArr || []).map((item, index) => {
        switch (item.type) {
          case "image":
            return (
              <div>
                <div
                  className="subheading-icon-container"
                  onClick={() => {
                    updateContentArr(index, "delete");
                  }}
                >
                  <p className="subheading">Image</p>
                  <div className="content-item-delete-background">
                    <TiDeleteOutline
                      size={15}
                      className="content-item-delete-icon"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Image Heading"
                  defaultValue={item.heading}
                  className="content-item-header-field"
                  onChange={(e) => {
                    updateContentArr(index, "heading", e);
                  }}
                />
                <div className="header-imgbar-n-btt">
                  <div className="header-imgsrc-container">
                    <div className="overflow-wrapper">
                      <p>{item.imgName || "No Image"}</p>
                    </div>
                  </div>
                  <label className="header-btt-upload">
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/gif"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        updateContentArr(index, "image", e);
                      }}
                    />
                    Upload
                  </label>
                </div>
              </div>
            );
          case "text":
            return (
              <div>
                <div
                  className="subheading-icon-container"
                  onClick={() => {
                    updateContentArr(index, "delete");
                  }}
                >
                  <p className="subheading">Text</p>
                  <div className="content-item-delete-background">
                    <TiDeleteOutline
                      size={15}
                      className="content-item-delete-icon"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Text Heading"
                  defaultValue={item.heading}
                  className="content-item-header-field"
                  onChange={(e) => {
                    updateContentArr(index, "heading", e);
                  }}
                />
                <textarea
                  type="text"
                  placeholder="Input here..."
                  defaultValue={item.value}
                  className="content-text-input"
                  onChange={(e) => {
                    updateContentArr(index, "text", e);
                  }}
                />
              </div>
            );
        }
      })
    );
  }, [contentArr]);

  // Form Updater
  useEffect(() => {
    if (isMounted.current) {
      let newObj = {};
      newObj.id = props.id;
      newObj.type = "content";
      newObj.heading = heading == "" ? false : heading;
      newObj.subheading = subheading == "" ? false : subheading;
      newObj.content = contentArr;

      props.updateForm("update", props.id, newObj);
    } else {
      isMounted.current = true;
    }
  }, [heading, subheading, contentArr]);

  return (
    <div className={props.editing == props.id ? "block-container" : "hidden"}>
      <p className="heading">Content Block</p>

      <p className="subheading">Heading</p>
      <input
        type="text"
        placeholder="Input here..."
        defaultValue={heading}
        className="textfield-container"
        onChange={(e) => {
          setHeading(e.target.value);
        }}
      />

      <p className="subheading">Subheading</p>
      <input
        type="text"
        placeholder="Input here..."
        defaultValue={subheading || ""}
        className="textfield-container"
        onChange={(e) => {
          setSubheading(e.target.value);
        }}
      />

      {contentRender}

      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div
          className="btt-add-content"
          onClick={() => {
            handleAddItem("image");
          }}
        >
          + Add Image
        </div>
        <div
          className="btt-add-content"
          onClick={() => {
            handleAddItem("text");
          }}
        >
          + Add Text
        </div>
      </div>
    </div>
  );

  function handleAddItem(type) {
    let tempArr = (contentArr || []).slice();
    switch (type) {
      case "image":
        tempArr.push({
          type: "image",
          heading: "Image Heading",
          imgName: "Default Image",
          value: require("../../../../common/assets/images/default_banner.png"),
          path: "",
        });
        break;
      case "text":
        tempArr.push({
          type: "text",
          heading: "Text Heading",
          value:
            "I am a body of text. Enter directions or descriptive information here!",
        });
        break;
    }
    setContentArr(tempArr);
  }

  async function updateContentArr(index, type, event = null) {
    let tempArr = contentArr.slice();
    let newVal;
    if (event) newVal = event.target.value;

    switch (type) {
      case "heading":
        tempArr[index].heading = newVal;
        break;
      case "text":
        tempArr[index].value = newVal;
        break;
      case "image":
        let value = await handleFileUpload(event);
        tempArr[index].imgName = value.name;
        tempArr[index].value = value.link;
        tempArr[index].path = value.path;
        break;
      case "delete":
        if (tempArr[index].type == "image" && tempArr[index].path !== "") {
          deleteObject(ref(storage, tempArr[index].path));
        }
        tempArr.splice(index, 1);
    }
    setContentArr(tempArr);
  }

  function handleFileUpload(e) {
    return new Promise((resolve) => {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        listAll(ref(storage, `appdata/${userID}/livedata/content`)).then(
          (result) => {
            let fileID = getNewID(
              result.items.map((item) => parseInt(item.name.split(".")[0]))
            );
            let uploadLocation = `appdata/${userID}/livedata/content/${fileID}.${file.type.slice(
              6
            )}`;
            uploadBytes(ref(storage, uploadLocation), file).then(() => {
              getDownloadURL(ref(storage, uploadLocation)).then((url) => {
                resolve({
                  name: file.name,
                  link: url,
                  path: uploadLocation,
                });
              });
            });
          }
        );
      }
    });
  }

  function getNewID(array) {
    let result = 0;
    while (array.includes(result)) {
      result++;
    }
    return result;
  }
}

export default ContentEditor;
