import React from "react";
import "../Notes.scoped.css";

const IndividualNote = ({ delegate, text, updateNotes }) => {
  return (
    <div className="noteblock-container">
      <p className="noteblock-title">{delegate}</p>
      <textarea
        type="text"
        value={text}
        placeholder="Input here..."
        className="noteblock-textfield"
        onChange={(e) => updateNotes(delegate, e.target.value)}
      ></textarea>
    </div>
  );
};

export default IndividualNote;
