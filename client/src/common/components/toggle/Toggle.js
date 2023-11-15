import React, { useState, useEffect } from "react";
import "./Toggle.scoped.css";
import { classNames, getTextWidth } from "../../utils/utils";

const COLORS = {
  green: {
    dark: "#3cdc27",
    light: "#cff9c3",
  },
  red: {
    dark: "#ff7070",
    light: "#ffc6c6",
  },
};

const Toggle = ({ size, color, value, onValue, label, style, ...other }) => {
  const [state, setState] = useState(Boolean(value) || false);
  const labelRight = label?.direction === "right";
  const isSmall = size === "small";
  const offset = isSmall ? 20 : 25;
  const labelMargin = isSmall ? 10 : 15;
  const darkColor = state ? COLORS[color].dark : "#aaaaaa";
  const lightColor = state ? COLORS[color].light : "#eeeeee";
  const fontSize = isSmall ? 12 : 16;

  useEffect(() => {
    onValue(state);
  }, [state]);

  return (
    <div
      className="container"
      onClick={() => setState(!state)}
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
          className="label noselect"
          style={Object.assign(
            {
              width: Math.max(
                getTextWidth(label.on, fontSize),
                getTextWidth(label.off, fontSize)
              ),
              color: darkColor,
              fontSize: `${fontSize}px`,
            },
            labelRight
              ? { marginLeft: labelMargin, textAlign: "left" }
              : { marginRight: labelMargin, textAlign: "right" }
          )}
        >
          {state ? label.on : label.off}
        </p>
      )}

      <div
        className={classNames("transition200", isSmall ? "bar-sm" : "bar-lg")}
        style={{ backgroundColor: lightColor }}
      >
        <div
          className={classNames(
            "transition200",
            isSmall ? "circle-sm" : "circle-lg"
          )}
          style={{
            left: state ? offset : 0,
            backgroundColor: darkColor,
          }}
        />
      </div>
    </div>
  );
};

export default Toggle;
