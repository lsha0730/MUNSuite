import React from "react";
import "./InvalidLink.scoped.css";
import { BiCompass } from "react-icons/bi";

function InvalidLink() {
  return (
    <div className="invalid-container">
      <BiCompass size={90} className="icon" />
      <p className="heading">Invalid Form Link</p>
      <p className="subheading">Contact your staff member</p>
    </div>
  );
}

export default InvalidLink;
