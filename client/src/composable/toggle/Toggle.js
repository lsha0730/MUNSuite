import React, { useState, useEffect } from "react";
import "./Toggle.scoped.css";
import { getTextWidth } from "../../utils/utils";

const TOGGLE_OFFSET = 25;

const Toggle = ({ value, onValue, label, style, ...other }) => {
  const [on, setOn] = useState(Boolean(value) || false);
  const labelRight = label.direction === "right";

  useEffect(() => {
    onValue(on);
  }, [on]);

  return (
    <div
      className="container"
      onClick={() => setOn(!on)}
      style={Object.assign(
        {
          flexDirection: labelRight ? "row-reverse" : "row",
        },
        style || {}
      )}
      {...other}
    >
      {label && (
        <p
          className={`label noselect ${on ? "labelon" : "labeloff"}`}
          style={Object.assign(
            {
              width: Math.max(getTextWidth(label.on), getTextWidth(label.off)),
            },
            labelRight
              ? { marginLeft: 15, textAlign: "left" }
              : { marginRight: 15, textAlign: "right" }
          )}
        >
          {on ? label.on : label.off}
        </p>
      )}

      <div className={`bar ${on ? "bgon" : "bgoff"}`}>
        <div
          className={`circle ${on ? "btton" : "bttoff"}`}
          style={{ left: on ? TOGGLE_OFFSET : 0 }}
        />
      </div>
    </div>
  );
};

export default Toggle;
