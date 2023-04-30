import React, { useState } from "react";
import styles from "./Delbar.module.css";
import { BsCheck } from "react-icons/bs";

function Delbar(props) {
  const [showingCopied, setShowingCopied] = useState(false);

  return (
    <div className={styles.delbar_container}>
      <div
        className={`${styles.delbar} ${props.selected ? styles.selected : ""}`}
        onClick={() => {
          props.handleClick(props.delegate);
        }}
      >
        <p className={styles.del_name}>{props.delegate}</p>
      </div>

      <div
        className={
          props.selected
            ? `${styles.codebox} ${styles.codebox_selected}`
            : styles.codebox
        }
        onClick={copyCode}
      >
        <p>{props.code}</p>
      </div>

      <BsCheck
        size={25}
        className={
          showingCopied ? styles.icon : `${styles.icon} + ${styles.fade}`
        }
      />
    </div>
  );

  function copyCode() {
    navigator.clipboard.writeText(props.code);
    setShowingCopied(true);
    setTimeout(() => {
      setShowingCopied(false);
    }, 300);
  }
}

export default Delbar;
