import React from "react";
import "./Legend.scoped.css";

const Legend = () => {
  return (
    <div className="container">
      <div className="set">
        <div className="circle passed" />
        <p>Passed Directives</p>
      </div>

      <div className="set">
        <div className="circle failed" />
        <p>Failed Directives</p>
      </div>
    </div>
  );
};

export default Legend;
