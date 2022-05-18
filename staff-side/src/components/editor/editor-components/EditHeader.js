import React, { useEffect, useState, useRef, useContext } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import "./EditorComponents.scoped.css";
import { appContext } from "../../../Context";

function EditHeader(props) {
    const {userID} = useContext(appContext);
    const [imageData, setImageData] = useState({});
    const [imageLink, setImageLink] = useState(props.image);
    const [heading, setHeading] = useState(props.heading);
    const [subheading, setSubheading] = useState(props.subheading);
    const isMounted = useRef(false);
    const storage = getStorage();

    useEffect(() => {
        if (props.heading) {
            document.getElementById("heading" + props.id).value = props.heading;
        }
        if (props.subheading) {
            document.getElementById("subheading" + props.id).value = props.subheading;
        }
    }, [])

    // Form Updater
    useEffect(() => {
        if (isMounted.current) {
            let newObj = {}
            newObj.id = props.id;
            newObj.type = "header";
            newObj.image = imageLink;
            newObj.heading = heading==""? false:heading;
            newObj.subheading = subheading==""? false:subheading;
            newObj.imageFileName = imageData.name || null;
    
            props.updateForm("update", props.id, newObj);
        } else {
            isMounted.current = true;
        }
    }, [heading, subheading, imageLink, imageData])

    return (
        <div className={props.editing==props.id? "block-container":"hidden"}>
            <p className="heading">Header</p>

            <p className="subheading">Image</p>

            <div className="header-imgbar-n-btt">
                <div className="header-imgsrc-container">
                    <div className="overflow-wrapper">
                        <p>{props.imageFileName || imageData.name}</p>
                    </div>
                </div>
                <label className="header-btt-upload">
                    <input type="file" accept="image/png, image/jpeg, image/gif" style={{display: "none"}} onChange={e => {handleFileUpload(e)}}></input>
                    Upload
                </label>
            </div>

            <p className="subheading">Heading</p>
            <input type="text" id={"heading" + props.id} placeholder="Input here..." className="textfield-container" onChange={() => {setHeading(document.getElementById("heading" + props.id).value)}}></input>

            <p className="subheading">Subheading</p>
            <input type="text" id={"subheading" + props.id} placeholder="Input here..." className="textfield-container" onChange={() => {setSubheading(document.getElementById("subheading" + props.id).value)}}></input>

        </div>
    )

    async function handleFileUpload(e) {
        if (e.target.files[0]) {
            let file = e.target.files[0];
            setImageData(file);

            let uploadLocation = `appdata/${userID}/livedata/banners`;
            uploadBytes(ref(storage, uploadLocation), file);
            getDownloadURL(ref(storage, uploadLocation)).then((url) => {
                setImageLink(url);
            })
        }
    }
}

export default EditHeader;