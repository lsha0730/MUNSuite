import React, { useState, useEffect, useContext } from "react";
import "./Editor.scoped.css";
import { appContext } from "../../staffContext";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { BiLink } from "react-icons/bi";

// Preview Imports
import Header from "./preview-components/Header.js";
import Radio from "./preview-components/Radio.js";
import MultipleChoice from "./preview-components/MultipleChoice.js";
import Content from "./preview-components/Content.js";
import ShortText from "./preview-components/ShortText.js";
import LongText from "./preview-components/LongText.js";
import Dropdown from "./preview-components/Dropdown.js";
import SelectMultiple from "./preview-components/SelectMultiple.js";

// Editor Imports
import EditHeader from "./editor-components/EditHeader.js";
import EditRadio from "./editor-components/EditRadio.js";
import EditMultipleChoice from "./editor-components/EditMultipleChoice.js";
import EditContent from "./editor-components/EditContent.js";
import EditShortText from "./editor-components/EditShortText.js";
import EditLongText from "./editor-components/EditLongText.js";
import EditDropdown from "./editor-components/EditDropdown.js";
import EditSelectMultiple from "./editor-components/EditSelectMultiple.js";

function Editor() {
  const { delegations } = useContext(appContext);
  const { settings } = useContext(appContext);
  const { form } = useContext(appContext);
  const { writeToFirebase } = useContext(appContext);
  const { userID } = useContext(appContext);
  const formLink = `${window.location.host}/form/${userID}`;

  const [editing, setEditing] = useState(false);
  const [formRender, setFormRender] = useState([]);
  const [isDisplayingConfirmation, setIsDisplayingConfirmation] = useState(
    false
  );
  const [standardized, setStandardized] = useState(
    settings.standardForm || false
  );
  const [toggleRender, setToggleRender] = useState();

  useEffect(() => {
    setStandardized(checkStandardized(form));
  }, [form]);

  useEffect(() => {
    rerenderForm();
  }, [form, editing, delegations]);

  useEffect(() => {
    rerenderToggle();
    rerenderForm();

    // Add standard start elements if not standardized already
    if (standardized && !checkStandardized(form)) {
      let frontArr = [];

      frontArr.push(makeNewBlock("header", 0, true, "New Header"));
      frontArr.push(makeNewBlock("shorttext", 1, true, "Directive Title"));
      frontArr.push(makeNewBlock("radio", 2, true, "Directive Type"));

      let sponsorsQ = makeNewBlock("select-multiple", 3, true, "Sponsors");
      let signatoriesQ = makeNewBlock(
        "select-multiple",
        4,
        false,
        "Signatories"
      );
      sponsorsQ.options = "all-delegations";
      signatoriesQ.options = "all-delegations";
      frontArr.push(sponsorsQ);
      frontArr.push(signatoriesQ);

      let tempArr = frontArr.concat(form.slice());
      for (let i = 0; i < tempArr.length; i++) {
        tempArr[i].id = i;
      }

      writeToFirebase("form", tempArr);
    }

    // Report standardization change to settings object in database
    let tempSettingsObj = JSON.parse(JSON.stringify(settings));
    tempSettingsObj.standardForm = standardized;
    writeToFirebase("settings", tempSettingsObj);
  }, [standardized]);

  return (
    <div className="editor-container">
      <div className="main-UI">
        <div className="hat-UI">
          <div className="preview-hat">
            <div className="preview-hat-top">
              <p className="preview-hat-heading">[Delegation Name]</p>
              <div
                className="preview-hat-link-icon-container"
                onClick={copyLink}
              >
                <BiLink className="preview-hat-link-icon" />
              </div>
              <div
                className={
                  isDisplayingConfirmation
                    ? "formlink-confirmation-container"
                    : "formlink-confirmation-container fade"
                }
              >
                <p className="formlink-confirmation-text">Share Link Copied!</p>
              </div>
            </div>
            <p className="preview-hat-subheading">{settings.committee}</p>
          </div>

          {toggleRender}
        </div>

        {formRender}

        <div className="addQ-container">
          <p className="addQ-text">Add Block</p>
          <div className="addQ-options-container">
            <div className="btt-addQ" onClick={() => addNewBlock("shorttext")}>
              Short Text
            </div>
            <div className="btt-addQ" onClick={() => addNewBlock("longtext")}>
              Long Text
            </div>
            <div className="btt-addQ" onClick={() => addNewBlock("radio")}>
              Radio
            </div>
            <div
              className="btt-addQ"
              onClick={() => addNewBlock("multiplechoice")}
            >
              Multiple Choice
            </div>
            <div
              className="btt-addQ"
              onClick={() => addNewBlock("select-multiple")}
            >
              Select Multiple
            </div>
            <div className="btt-addQ" onClick={() => addNewBlock("dropdown")}>
              Dropdown
            </div>
            <div className="btt-addQ" onClick={() => addNewBlock("content")}>
              Content Block
            </div>
            <div className="btt-addQ" onClick={() => addNewBlock("header")}>
              Header
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function rerenderToggle() {
    let toggleOffset = standardized ? 25 : 0;
    setToggleRender(
      <div
        className="toggle-set"
        onClick={() => {
          setStandardized(!standardized);
        }}
      >
        <p className={standardized ? "toggle-text-green" : "toggle-text-red"}>
          {standardized ? "Standardized for MUN" : "Custom Form"}
        </p>
        <div
          className={
            standardized
              ? "toggle-bar toggle-greenbg"
              : "toggle-bar toggle-redbg"
          }
        >
          <div
            className={
              standardized
                ? "toggle-circle toggle-greenbtt"
                : "toggle-circle toggle-redbtt"
            }
            style={{ left: toggleOffset }}
          />
        </div>
      </div>
    );
  }

  function copyLink() {
    navigator.clipboard.writeText(formLink);
    setIsDisplayingConfirmation(true);
    setTimeout(() => setIsDisplayingConfirmation(false), 1000);
  }

  function makeNewBlock(type, id, required, heading = null) {
    let newObj = {};
    newObj.id = id;
    newObj.type = type;
    newObj.subheading = false;

    switch (type) {
      case "header":
        newObj.heading = "New Header";
        newObj.imgLink = require("./defaultBanner.png");
        newObj.imgName = "Default Banner";
        newObj.imgPath = "";
        break;
      case "radio":
        newObj.heading = "New Radio";
        newObj.required = required;
        newObj.options = ["Option 1", "Option 2", "Option 3"];
        break;
      case "multiplechoice":
        newObj.heading = "New Multiple Choice";
        newObj.required = required;
        newObj.options = ["Option 1", "Option 2", "Option 3"];
        break;
      case "content":
        newObj.heading = "New Content Block";
        newObj.content = [
          {
            type: "image",
            heading: "Image Heading",
            value: require("./defaultBanner.png"),
            imgName: "Default Image",
            path: "",
          },
          {
            type: "text",
            heading: "Text Heading",
            value:
              "I am a body of text. Enter directions or descriptive information here!",
          },
        ];
        break;
      case "shorttext":
        newObj.heading = "New Short Text";
        newObj.required = required;
        break;
      case "longtext":
        newObj.heading = "New Long Text";
        newObj.required = required;
        break;
      case "dropdown":
        newObj.heading = "New Dropdown";
        newObj.required = required;
        newObj.options = ["Option 1", "Option 2", "Option 3"];
        break;
      case "select-multiple":
        newObj.heading = "New Select Multiple";
        newObj.required = required;
        newObj.options = ["Option 1", "Option 2", "Option 3"];
        newObj.max = false;
        break;
      default:
        console.log("Could not make form block.");
    }

    if (heading) newObj.heading = heading;
    return newObj;
  }

  function addNewBlock(type) {
    let tempArr = form.slice();
    let newObj = makeNewBlock(type, tempArr.length, false);

    tempArr.push(newObj);
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i].id = i;
    }

    writeToFirebase("form", tempArr);
  }

  function updateForm(operation, index, newObj = null) {
    let tempArr = form.slice();
    switch (operation) {
      case "delete":
        tempArr.splice(index, 1);
        for (let i = 0; i < tempArr.length; i++) {
          tempArr[i].id = i;
        }
        break;
      case "update":
        tempArr.splice(index, 1, newObj);
        break;
      case "move-up":
        if (tempArr[index - 1]) {
          let tempObj = tempArr[index - 1];
          tempArr[index - 1] = tempArr[index];
          tempArr[index] = tempObj;

          for (let i = 0; i < tempArr.length; i++) {
            tempArr[i].id = i;
          }

          if (editing == index) setEditing(editing - 1);
        }
        break;
      case "move-down":
        if (tempArr[index + 1]) {
          let tempObj = tempArr[index + 1];
          tempArr[index + 1] = tempArr[index];
          tempArr[index] = tempObj;

          for (let i = 0; i < tempArr.length; i++) {
            tempArr[i].id = i;
          }

          if (editing == index) setEditing(editing + 1);
        }
        break;
    }

    writeToFirebase("form", tempArr);
  }

  function rerenderForm() {
    setFormRender(
      form.map((item) => {
        switch (item.type) {
          case "header":
            return (
              <div className="preview-editor-pair">
                <Header
                  key={`preview${item.id}`}
                  id={item.id}
                  imgPath={item.imgPath}
                  imgLink={item.imgLink}
                  heading={item.heading}
                  subheading={item.subheading}
                  editing={editing}
                  setEditing={setEditing}
                  updateForm={updateForm}
                  locked={standardized && item.id == 0}
                />
                <EditHeader
                  key={`editor${item.id}${editing}`}
                  id={item.id}
                  imgPath={item.imgPath}
                  imgLink={item.imgLink}
                  imgName={item.imgName}
                  heading={item.heading}
                  subheading={item.subheading}
                  editing={editing}
                  updateForm={updateForm}
                  locked={standardized && item.id == 0}
                />
              </div>
            );
          case "radio":
            return (
              <div className="preview-editor-pair">
                <Radio
                  key={`preview${item.id}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  options={item.options || []}
                  editing={editing}
                  setEditing={setEditing}
                  updateForm={updateForm}
                  locked={standardized && item.id == 2}
                />
                <EditRadio
                  key={`editor${item.id}${editing}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  options={item.options || []}
                  editing={editing}
                  updateForm={updateForm}
                  locked={standardized && item.id == 2}
                />
              </div>
            );
          case "multiplechoice":
            return (
              <div className="preview-editor-pair">
                <MultipleChoice
                  key={`preview${item.id}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  options={item.options || []}
                  editing={editing}
                  setEditing={setEditing}
                  updateForm={updateForm}
                  locked={standardized}
                />
                <EditMultipleChoice
                  key={`editor${item.id}${editing}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  options={item.options || []}
                  editing={editing}
                  updateForm={updateForm}
                  locked={standardized}
                />
              </div>
            );
          case "content":
            return (
              <div className="preview-editor-pair">
                <Content
                  key={`preview${item.id}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  content={item.content || []}
                  editing={editing}
                  setEditing={setEditing}
                  updateForm={updateForm}
                  locked={standardized}
                />
                <EditContent
                  key={`editor${item.id}${editing}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  content={item.content || []}
                  editing={editing}
                  updateForm={updateForm}
                  locked={standardized}
                />
              </div>
            );
          case "shorttext":
            return (
              <div className="preview-editor-pair">
                <ShortText
                  key={`preview${item.id}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  editing={editing}
                  setEditing={setEditing}
                  updateForm={updateForm}
                  locked={standardized && item.id == 1}
                />
                <EditShortText
                  key={`editor${item.id}${editing}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  editing={editing}
                  updateForm={updateForm}
                  locked={standardized && item.id == 1}
                />
              </div>
            );
          case "longtext":
            return (
              <div className="preview-editor-pair">
                <LongText
                  key={`preview${item.id}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  editing={editing}
                  setEditing={setEditing}
                  updateForm={updateForm}
                  locked={standardized}
                />
                <EditLongText
                  key={`editor${item.id}${editing}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  editing={editing}
                  updateForm={updateForm}
                  locked={standardized}
                />
              </div>
            );
          case "dropdown":
            return (
              <div className="preview-editor-pair">
                <Dropdown
                  key={`preview${item.id}${delegations.length}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  options={item.options || []}
                  editing={editing}
                  setEditing={setEditing}
                  updateForm={updateForm}
                  locked={standardized}
                />
                <EditDropdown
                  key={`editor${item.id}${editing}${delegations.length}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  options={item.options || []}
                  editing={editing}
                  updateForm={updateForm}
                  locked={standardized}
                />
              </div>
            );
          case "select-multiple":
            return (
              <div className="preview-editor-pair">
                <SelectMultiple
                  key={`preview${item.id}${
                    item.options ? item.options.length : 0
                  }${delegations.length}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  max={item.max}
                  options={item.options || []}
                  editing={editing}
                  setEditing={setEditing}
                  updateForm={updateForm}
                  locked={standardized && (item.id == 3 || item.id == 4)}
                />
                <EditSelectMultiple
                  key={`editor${item.id}${editing}${delegations.length}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  max={item.max}
                  options={item.options || []}
                  editing={editing}
                  updateForm={updateForm}
                  locked={standardized && (item.id == 3 || item.id == 4)}
                />
              </div>
            );
          default:
            console.log("Could not render form block.");
        }
      })
    );
  }

  function checkStandardized(formArr) {
    return (
      formArr.length >= 5 &&
      formArr[0].type == "header" &&
      formArr[1].type == "shorttext" &&
      formArr[1].heading == "Directive Title" &&
      formArr[1].required &&
      formArr[2].type == "radio" &&
      formArr[2].heading == "Directive Type" &&
      formArr[2].required &&
      formArr[3].type == "select-multiple" &&
      formArr[3].heading == "Sponsors" &&
      formArr[3].required &&
      formArr[3].options == "all-delegations" &&
      formArr[4].type == "select-multiple" &&
      formArr[4].heading == "Signatories" &&
      !formArr[4].required &&
      formArr[4].options == "all-delegations"
    );
  }
}

export default Editor;
