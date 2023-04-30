import React from "react";
import styles from "./Notes.module.css";

const IndividualNote = ({ delegate, text, updateNotes }) => {
  return (
    <div className={styles.noteblock_container}>
      <p className={styles.noteblock_title}>{delegate}</p>
      <textarea
        type="text"
        value={text}
        placeholder="Input here..."
        className={styles.noteblock_textfield}
        onChange={(e) => updateNotes(delegate, e.target.value)}
      />
    </div>
  );
};

export default IndividualNote;
