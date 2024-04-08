import React, { useEffect, useState, useRef, useContext } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  listAll,
} from "firebase/storage";
import "../Generic.scoped.css";
import "./HeaderEditor.scoped.css";
import { staffContext } from "../../../../common/Context";
import { FormOperation } from "../../../../common/types/types";

function HeaderEditor(props) {
  const { userID } = useContext(staffContext);
  const [imageData, setImageData] = useState({
    imgLink: props.imgLink,
    imgName: props.imgName,
    imgPath: props.imgPath,
  });
  const [heading, setHeading] = useState(props.heading);
  const [subheading, setSubheading] = useState(props.subheading);
  const isMounted = useRef(false);
  const storage = getStorage();

  // Form Updater
  useEffect(() => {
    if (isMounted.current) {
      let newObj = {};
      newObj.id = props.id;
      newObj.type = "header";
      newObj.heading = heading == "" ? false : heading;
      newObj.subheading = subheading == "" ? false : subheading;
      newObj.imgLink = imageData.imgLink;
      newObj.imgName = imageData.imgName || null;
      newObj.imgPath = imageData.imgPath || "";

      props.updateForm(FormOperation.Update, props.id, newObj);
    } else {
      isMounted.current = true;
    }
  }, [heading, subheading, imageData]);

  return (
    <div className={props.editing == props.id ? "block-container" : "hidden"}>
      <p className="heading">Header</p>

      <p className="subheading">Image</p>

      <div className="header-imgbar-n-btt">
        <div className="header-imgsrc-container">
          <div className="overflow-wrapper">
            <p>{props.imgName || imageData.imgName}</p>
          </div>
        </div>
        <label className="header-btt-upload">
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            style={{ display: "none" }}
            onChange={(e) => {
              handleFileUpload(e);
            }}
          />
          Upload
        </label>
      </div>

      <p className="subheading">Heading</p>
      <input
        type="text"
        placeholder="Input here..."
        className="textfield-container"
        defaultValue={props.heading ? props.heading : ""}
        onChange={(e) => {
          setHeading(e.target.value);
        }}
      />

      <p className="subheading">Subheading</p>
      <input
        type="text"
        placeholder="Input here..."
        className="textfield-container"
        defaultValue={props.subheading ? props.subheading : ""}
        onChange={(e) => {
          setSubheading(e.target.value);
        }}
      />
    </div>
  );

  function handleFileUpload(e) {
    if (e.target.files[0]) {
      let file = e.target.files[0];
      listAll(ref(storage, `appdata/${userID}/livedata/header`)).then(
        (result) => {
          let fileID = getNewID(
            result.items.map((item) => parseInt(item.name.split(".")[0]))
          );
          let uploadLocation =
            props.imgPath == ""
              ? `appdata/${userID}/livedata/header/${fileID}.${file.type.slice(
                  6
                )}`
              : props.imgPath;
          uploadBytes(ref(storage, uploadLocation), file).then(() => {
            getDownloadURL(ref(storage, uploadLocation)).then((url) => {
              setImageData({
                imgName: file.name,
                imgLink: url,
                imgPath: uploadLocation,
              });
            });
          });
        }
      );
    }
  }

  function getNewID(array) {
    let result = 0;
    while (array.includes(result)) {
      result++;
    }
    return result;
  }
}

export default HeaderEditor;
