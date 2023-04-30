import React, { useState } from "react";
import styles from "./StatusIndicator.module.css";
import { RiMessage2Fill } from "react-icons/ri";

const StatusIndicator = ({ status, feedback, cardExtended }) => {
  const statusL = ["Passed", "Failed"].includes(status)
    ? status.toLowerCase()
    : "draft";
  const [showingFeedback, setShowingFeedback] = useState(false);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.indicator} ${styles[statusL]} ${
          feedback && status !== "Pending"
            ? `${styles.cursor_pointer} ${styles[`hover_${statusL}`]}`
            : ""
        }`}
        onClick={(e) => {
          if (feedback && status !== "Pending") {
            setShowingFeedback(!showingFeedback);
            if (cardExtended) e.stopPropagation();
          }
        }}
      >
        {status}
        {feedback && <RiMessage2Fill style={{ marginLeft: 5 }} />}
      </div>

      {showingFeedback && (
        <div className={styles.feedback}>
          <div className={styles.feedback_heading}>Feedback from the dais</div>
          <p className={styles.feedback_text}>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;
