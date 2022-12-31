import React, { useState } from "react";
import "./StatusIndicator.scoped.css";
import { RiMessage2Fill } from "react-icons/ri";

const StatusIndicator = ({ status, feedback, cardExtended }) => {
  const statusL = status.toLowerCase();
  const [showingFeedback, setShowingFeedback] = useState(false);

  return (
    <div className="container">
      <div
        className={`indicator ${statusL} ${
          feedback && status !== "Pending"
            ? `cursor-pointer hover-${statusL}`
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
        <div className="feedback">
          <div className="feedback-heading">Feedback from the dais</div>
          <p className="feedback-text">{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;
