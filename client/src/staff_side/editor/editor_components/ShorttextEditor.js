import React, { useEffect, useState, useRef } from "react";
import "./Generic.scoped.css";
import Toggle from "../../../common/components/toggle/Toggle";

function ShorttextEditor(props) {
  const [require, setRequire] = useState(props.required);
  const [heading, setHeading] = useState(props.heading);
  const [subheading, setSubheading] = useState(props.subheading);
  const isMounted = useRef(false);

  useEffect(() => {
    if (props.heading) {
      document.getElementById("heading" + props.id).value = props.heading;
    }
    if (props.subheading) {
      document.getElementById("subheading" + props.id).value = props.subheading;
    }
  }, []);

  // Form Updater
  useEffect(() => {
    if (isMounted.current) {
      let newObj = {};
      newObj.id = props.id;
      newObj.type = "shorttext";
      newObj.required = require;
      newObj.heading = heading == "" ? false : heading;
      newObj.subheading = subheading == "" ? false : subheading;

      props.updateForm("update", props.id, newObj);
    } else {
      isMounted.current = true;
    }
  }, [require, heading, subheading]);

  return (
    <div className={props.editing == props.id ? "block-container" : "hidden"}>
      <p className="heading">Short Text</p>
      <Toggle
        size="small"
        color="red"
        value={require}
        onValue={setRequire}
        label={{
          on: "Required",
          off: "Optional",
          direction: "left",
        }}
        style={{ position: "absolute", top: 20, right: 35, cursor: "pointer" }}
      />

      <p className="subheading">Heading</p>
      <input
        type="text"
        id={"heading" + props.id}
        className={
          props.locked ? "textfield-container-bricked" : "textfield-container"
        }
        disabled={props.locked}
        placeholder="Input here..."
        onChange={() => {
          setHeading(document.getElementById("heading" + props.id).value);
        }}
      />

      <p className="subheading">Subheading</p>
      <input
        type="text"
        id={"subheading" + props.id}
        className="textfield-container"
        placeholder="Input here..."
        onChange={() => {
          setSubheading(document.getElementById("subheading" + props.id).value);
        }}
      />
    </div>
  );
}

export default ShorttextEditor;
