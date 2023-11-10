import React, { useState } from "react";
import "./Hover.scoped.css";

const Hoverable = ({ message, pos, children, messageStyle, ...other }) => {
  const [hover, setHover] = useState(false);

  return (
    <a
      {...other}
      className="container"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      target="_blank"
    >
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
      {children}
    </a>
  );
};

export default Hoverable;
