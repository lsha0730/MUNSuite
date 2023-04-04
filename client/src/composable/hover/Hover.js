import React, { useState } from "react";
import "./Hover.scoped.css";

const Hoverable = ({ message, pos, children, ...other }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      {...other}
      className="container"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div
        className="hover"
        style={Object.assign({ opacity: hover ? "100%" : "0%" }, pos)}
      >
        {message}
      </div>
      {children}
    </div>
  );
};

export default Hoverable;
