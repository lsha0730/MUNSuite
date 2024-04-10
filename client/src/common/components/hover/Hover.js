import React, { useState } from "react";
import "./Hover.scoped.css";

const Hoverable = ({ message, pos, children, messageStyle = {}, ...other }) => {
  const [hover, setHover] = useState(false);

  return (
    <a {...other} className="container" target="_blank">
      <div
        className="hover"
        style={Object.assign(
          { opacity: hover ? "100%" : "0%" },
          pos,
          messageStyle
        )}
      >
        {message}
      </div>
      <a
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        {children}
      </a>
    </a>
  );
};

export default Hoverable;
