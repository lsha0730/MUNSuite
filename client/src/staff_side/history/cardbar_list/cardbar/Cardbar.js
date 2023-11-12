import React from "react";
import { highlight } from "../../../../common/utils/utils";
import "./Cardbar.scoped.css";

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
      <div className="cardbar-container">
        <div
          className="cardbar-indicator"
          style={{
            backgroundColor: status == "Passed" ? PASSED_COLOR : FAILED_COLOR,
          }}
        />
        <div
          className={selected ? "cardbar-body selected" : "cardbar-body"}
          onClick={onClick}
        >
          <div className="cardbar-left">
            <p className="cardbar-title">{h(author)}</p>
          </div>

          <div className="cardbar-right">
            <p className="cardbar-desc">{h(description)}</p>
            <p className="cardbar-id">{h(submissionID)}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cardbar-container">
        <div
          className="cardbar-indicator"
          style={{
            backgroundColor: status == "Passed" ? PASSED_COLOR : FAILED_COLOR,
          }}
        />
        <div
          className={selected ? "cardbar-body selected" : "cardbar-body"}
          onClick={onClick}
        >
          <div className="cardbar-left">
            <p className="cardbar-title">{h(title)}</p>
          </div>

          <div className="cardbar-right">
            <p className="cardbar-desc">{h(description)}</p>
            <p className="cardbar-id">{h(submissionID)}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Cardbar;
