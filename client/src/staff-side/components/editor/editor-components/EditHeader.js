import React, { useEffect, useState, useRef, useContext } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  listAll,
} from "firebase/storage";
import styles from "./EditorComponents.module.css";
import { appContext } from "../../../staffContext";

function EditHeader(props) {
  const { userID } = useContext(appContext);
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

      props.updateForm("update", props.id, newObj);
    } else {
      isMounted.current = true;
    }
  }, [heading, subheading, imageData]);

  return (
    <div
      className={
        props.editing == props.id ? styles.block_container : styles.hidden
      }
    >
      <p className={styles.heading}>Header</p>

      <p className={styles.subheading}>Image</p>

      <div className={styles.header_imgbar_n_btt}>
        <div className={styles.header_imgsrc_container}>
          <div className={styles.overflow_wrapper}>
            <p>{props.imgName || imageData.imgName}</p>
          </div>
        </div>
        <label className={styles.header_btt_upload}>
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

      <p className={styles.subheading}>Heading</p>
      <input
        type="text"
        placeholder="Input here..."
        className={styles.textfield_container}
        defaultValue={props.heading ? props.heading : ""}
        onChange={(e) => {
          setHeading(e.target.value);
        }}
      />

      <p className={styles.subheading}>Subheading</p>
      <input
        type="text"
        placeholder="Input here..."
        className={styles.textfield_container}
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

export default EditHeader;
