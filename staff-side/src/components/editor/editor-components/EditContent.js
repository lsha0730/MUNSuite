import React, { useEffect, useState, useRef } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import "./EditorComponents.scoped.css";
import { TiDeleteOutline } from "react-icons/ti";

function EditContent(props) {
    const [heading, setHeading] = useState(props.heading);
    const [subheading, setSubheading] = useState(props.subheading);
    const [contentArr, setContentArr] = useState(props.content);
    const [contentRender, setContentRender] = useState();
    const isMounted = useRef(false);
    const storage = getStorage();

    useEffect(() => {
        setContentRender((contentArr || []).map((item, index) => {
            switch (item.type) {
                case "image":
                    return (
                        <div>
                            <div className="subheading-icon-container" onClick={() => {updateContentArr(index, "delete")}}>
                                <p className="subheading">Image</p>
                                <div className="content-item-delete-background"><TiDeleteOutline size={15} className="content-item-delete-icon"/></div>
                            </div>
                            <input type="text" placeholder="Image Heading" defaultValue={item.heading} className="content-item-header-field" onChange={e => {updateContentArr(index, "heading", e)}}></input>
                            <div className="header-imgbar-n-btt">
                                <div className="header-imgsrc-container">
                                    <div className="overflow-wrapper">
                                        <p>{item.imgName || "No Image"}</p>
                                    </div>
                                </div>
                                <label className="header-btt-upload">
                                    <input type="file" accept="image/png, image/jpeg, image/gif" style={{display: "none"}} onChange={e => {updateContentArr(index, "image", e)}}></input>
                                    Upload
                                </label>
                            </div>
                        </div>
                    )
                case "text":
                    return (
                        <div>
                            <div className="subheading-icon-container" onClick={() => {updateContentArr(index, "delete")}}>
                                <p className="subheading">Text</p>
                                <div className="content-item-delete-background"><TiDeleteOutline size={15} className="content-item-delete-icon"/></div>
                            </div>
                            <input type="text" placeholder="Text Heading" defaultValue={item.heading} className="content-item-header-field" onChange={e => {updateContentArr(index, "heading", e)}}></input>
                            <textarea type="text" placeholder="Input here..." defaultValue={item.value} className="content-text-input" onChange={e => {updateContentArr(index, "text", e)}}></textarea>
                        </div>
                    )
            }
        }))
    }, [contentArr])

    // Form Updater
    useEffect(() => {
        if (isMounted.current) {
            let newObj = {}
            newObj.id = props.id;
            newObj.type = "content";
            newObj.heading = heading==""? false:heading;
            newObj.subheading = subheading==""? false:subheading;
            newObj.content = contentArr;
    
            props.updateForm("update", props.id, newObj);
        } else {
            isMounted.current = true;
        }
    }, [heading, subheading, contentArr])

    return (
        <div className={props.editing==props.id? "block-container":"hidden"}>
            <p className="heading">Content Block</p>

            <p className="subheading">Heading</p>
            <input type="text" placeholder="Input here..." defaultValue={heading} className="textfield-container" onChange={e => {setHeading(e.target.value)}}></input>

            <p className="subheading">Subheading</p>
            <input type="text" placeholder="Input here..." defaultValue={subheading || ""} className="textfield-container" onChange={e => {setSubheading(e.target.value)}}></input>

            {contentRender}

            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <div className="btt-add-content" onClick={() => {handleAddItem("image")}}>+ Add Image</div>
                <div className="btt-add-content" onClick={() => {handleAddItem("text")}}>+ Add Text</div>
            </div>
        </div>
    )

    function handleAddItem(type) {
        let tempArr = (contentArr || []).slice();
        switch (type) {
            case "image":
                tempArr.push({
                    type: "image",
                    heading: "New Image",
                    imgName: "Default Image",
                    value: require("../defaultBanner.png")
                })
                break;
            case "text":
                tempArr.push({
                    type: "text",
                    heading: "New Image",
                    value: "I am a body of text. Enter directions or descriptive information here!"
                })
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
                break;
            case "delete":
                tempArr.splice(index, 1);
        }
        setContentArr(tempArr);
    }

    function handleFileUpload(e) {
        return new Promise(resolve => {
            if (e.target.files[0]) {
                let file = e.target.files[0];
                let imgURL = "";
    
                uploadBytes(ref(storage, "test/content"), file);
                getDownloadURL(ref(storage, "test/content")).then((url) => {
                    imgURL = url;
                    resolve({
                        name: file.name,
                        link: imgURL
                    })
                })
            }
        })
    }
}

export default EditContent;