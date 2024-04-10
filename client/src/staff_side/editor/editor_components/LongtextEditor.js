import { useEffect, useState, useRef } from "react";
import "./QEditor.scoped.css";
import Toggle from "../../../common/components/toggle/Toggle";
import { FormOperation } from "../../../common/types/types";

const MAX_CHAR_LIMIT = 10000;

function LongtextEditor(props) {
  const [require, setRequire] = useState(props.required);
  const [heading, setHeading] = useState(props.heading);
  const [subheading, setSubheading] = useState(props.subheading);
  const [maxchars, setMaxchars] = useState(props.maxchars);
  const isMounted = useRef(false);

  const headingRef = useRef();
  const subheadingRef = useRef();
  const maxcharsRef = useRef();

  useEffect(() => {
    if (props.heading && headingRef.current) {
      headingRef.current.value = props.heading;
    }
    if (props.subheading && subheadingRef.current) {
      subheadingRef.current.value = props.subheading;
    }
    if (props.maxchars && maxcharsRef.current) {
      maxcharsRef.current.value = props.maxchars;
    }
  }, []);

  // Form Updater
  useEffect(() => {
    if (isMounted.current) {
      let newObj = {};
      newObj.id = props.id;
      newObj.type = "longtext";
      newObj.required = require;
      newObj.heading = heading == "" ? false : heading;
      newObj.subheading = subheading == "" ? false : subheading;
      newObj.maxchars = !maxchars ? false : maxchars;

      props.updateForm(FormOperation.Update, props.id, newObj);
    } else {
      isMounted.current = true;
    }
  }, [require, heading, subheading, maxchars]);

  return (
    <div className={props.editing == props.id ? "block-container" : "hidden"}>
      <p className="heading">Long Text</p>
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
        ref={headingRef}
        type="text"
        placeholder="Input here..."
        className="textfield-container"
        onChange={(e) => {
          setHeading(e.target.value);
        }}
      />

      <p className="subheading">Subheading</p>
      <input
        ref={subheadingRef}
        type="text"
        placeholder="Input here..."
        className="textfield-container"
        onChange={(e) => {
          setSubheading(e.target.value);
        }}
      />

      <p className="subheading">Max Characters</p>
      <input
        ref={maxcharsRef}
        type="number"
        min="1"
        max={`${MAX_CHAR_LIMIT}`}
        placeholder="No Limit"
        className="textfield-container"
        onChange={(e) => {
          if (e.target.value > MAX_CHAR_LIMIT) e.target.value = MAX_CHAR_LIMIT;
          setMaxchars(
            Math.min(parseInt(e.target.value), MAX_CHAR_LIMIT) || false
          );
        }}
      />
    </div>
  );
}

export default LongtextEditor;
