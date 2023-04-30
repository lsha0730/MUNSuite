import React, { useState } from "react";
import styles from "./Hover.module.css";

const Hoverable = ({ message, pos, children, className, ...other }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      {...other}
      className={`${styles.container} ${className}`}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div
        className={styles.hover}
        style={Object.assign({ opacity: hover ? "100%" : "0%" }, pos)}
      >
        {message}
      </div>
      {children}
    </div>
  );
};

export default Hoverable;
