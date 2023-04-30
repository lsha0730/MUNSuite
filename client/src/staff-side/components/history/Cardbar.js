import React from "react";
import { highlight } from "../../utils";
import styles from "./History.module.css";

const PASSED_COLOR = "#7AFF69";
const FAILED_COLOR = "#FF8080";

function Cardbar({
  type,
  status,
  selected,
  onClick,
  title,
  description,
  submissionID,
  author,
  search,
}) {
  const h = (text) => (search ? highlight(text, search) : text);

  if (type == "custom") {
    return (
      <div className={styles.cardbar_container}>
        <div
          className={styles.cardbar_indicator}
          style={{
            backgroundColor: status == "Passed" ? PASSED_COLOR : FAILED_COLOR,
          }}
        />
        <div
          className={`${styles.cardbar_body} ${
            selected ? styles.selected : ""
          }`}
          onClick={onClick}
        >
          <div className={styles.cardbar_left}>
            <p className={styles.cardbar_title}>{h(author)}</p>
          </div>

          <div className={styles.cardbar_right}>
            <p className={styles.cardbar_desc}>{h(description)}</p>
            <p className={styles.cardbar_id}>{h(submissionID)}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.cardbar_container}>
        <div
          className={styles.cardbar_indicator}
          style={{
            backgroundColor: status == "Passed" ? PASSED_COLOR : FAILED_COLOR,
          }}
        />
        <div
          className={`${styles.cardbar_body} ${
            selected ? styles.selected : ""
          }`}
          onClick={onClick}
        >
          <div className={styles.cardbar_left}>
            <p className={styles.cardbar_title}>{h(title)}</p>
          </div>

          <div className={styles.cardbar_right}>
            <p className={styles.cardbar_desc}>{h(description)}</p>
            <p className={styles.cardbar_id}>{h(submissionID)}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Cardbar;
