import React from "react";
import "./Hover.scoped.css";

const Hover = ({ message, show, pos }) => {
  return (
    <div
      className="hover"
      style={Object.assign({ opacity: show ? "100%" : "0%" }, pos)}
    >
      {message}
    </div>
  );
};

export default Hover;
