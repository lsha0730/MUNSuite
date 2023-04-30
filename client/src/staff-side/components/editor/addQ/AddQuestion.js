import React from "react";
import styles from "./AddQuestion.module.css";

const OPTIONS = [
  { key: "shorttext", label: "Short Text" },
  { key: "longtext", label: "Long Text" },
  { key: "radio", label: "Radio" },
  { key: "multiplechoice", label: "Multiple Choice" },
  { key: "select-multiple", label: "Select Multiple" },
  { key: "dropdown", label: "Dropdown" },
  { key: "content", label: "Content Block" },
  { key: "header", label: "Header" },
];

function AddQuestion({ addNewBlock }) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>Add Block</p>
      <div className={styles.options_container}>
        {OPTIONS.map((e) => (
          <div
            className={styles.btt}
            onClick={() => {
              addNewBlock(e.key);
            }}
          >
            {e.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddQuestion;
