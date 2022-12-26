import React from "react";
import { highlight } from "../../utils";
import "./History.scoped.css";

const PASSED_COLOR = "#7AFF69";
const FAILED_COLOR = "#FF8080";

function Cardbar({
  type,
  status,
  selected,
  onClick,
  title,
  submissionID,
  author,
  search,
}) {
  const h = (text) => (search ? highlight(text, search) : text);

  if (type == "custom") {
    return (
      <div className="cardbar-container">
        <div
          className={selected ? "cardbar-body selected" : "cardbar-body"}
          onClick={onClick}
        >
          <div
            className="cardbar-indicator"
            style={{
              backgroundColor: status == "Passed" ? PASSED_COLOR : FAILED_COLOR,
            }}
          />
          <p>{h(`Submission ${submissionID} by ${author}`)}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cardbar-container">
        <div
          className={selected ? "cardbar-body selected" : "cardbar-body"}
          onClick={onClick}
        >
          <div
            className="cardbar-indicator"
            style={{
              backgroundColor: status == "Passed" ? PASSED_COLOR : FAILED_COLOR,
            }}
          />
          <p>{h(title)}</p>
        </div>
      </div>
    );
  }
}

export default Cardbar;
