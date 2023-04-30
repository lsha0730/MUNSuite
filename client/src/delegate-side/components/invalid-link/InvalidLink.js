import React from "react";
import styles from "./InvalidLink.module.css";
import { BiCompass } from "react-icons/bi";

function InvalidLink() {
  return (
    <div className={styles.invalid_container}>
      <BiCompass size={90} className={styles.icon} />
      <p className={styles.heading}>Invalid Form Link</p>
      <p className={styles.subheading}>Contact your staff member</p>
    </div>
  );
}

export default InvalidLink;
