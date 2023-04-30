import React, { useState, useEffect } from "react";
import styles from "./Toggle.module.css";
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
      className={styles.container}
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
          className={`${styles.label} ${styles.noselect} ${
            on ? styles.labelon : styles.labeloff
          }`}
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

      <div className={`${styles.bar} ${on ? styles.bgon : styles.bgoff}`}>
        <div
          className={`${styles.circle} ${on ? styles.btton : styles.bttoff}`}
          style={{ left: on ? TOGGLE_OFFSET : 0 }}
        />
      </div>
    </div>
  );
};

export default Toggle;
