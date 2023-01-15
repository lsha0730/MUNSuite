import React, { useState, useEffect, useContext } from "react";
import { delContext } from "../../DelegateContext";
import DirectiveCard from "../../../staff-side/components/inbox/components/DirectiveCard";
import "./HistorySidebar.scoped.css";
import { FaHistory } from "react-icons/fa";

const HistorySidebar = () => {
  const { pendings, processed, user } = useContext(delContext);
  const [relevantDirectives, setRelevantDirectives] = useState([]);

  function getReversed(array) {
    let tempArr = array.slice();
    tempArr.reverse();
    return tempArr;
  }

  useEffect(() => {
    const relevants = getReversed(pendings || [])
      .concat(getReversed(processed || []))
      .filter((item) => {
        if (item == undefined) return false;
        if (item.standard) {
          return item.sponsors.includes(user) || item.author == user;
        } else {
          return item.author == user;
        }
      });
    setRelevantDirectives(
      relevants.sort((a, b) => b.submissionID - a.submissionID)
    );
  }, [pendings, processed]);

  return (
    <div className="history-container">
      <div className="history-top">
        <div className="history-top-contents">
          <FaHistory size={35} className="history-icon" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: 20, fontWeight: 600, color: "#B0B0B0" }}>
              Relevant Submissions
            </p>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#B0B0B0" }}>
              Click cards to expand
            </p>
          </div>
        </div>
      </div>
      {relevantDirectives && relevantDirectives.length > 0 ? (
        <div className="history-cards-container" key="history-cards">
          {relevantDirectives
            .map((directive) => {
              if (directive.standard) {
                return (
                  <DirectiveCard
                    key={JSON.stringify(relevantDirectives)}
                    page="delegate"
                    variant="standard"
                    id={directive.submissionID}
                    title={directive.title}
                    type={directive.type}
                    sponsors={directive.sponsors || []}
                    signatories={directive.signatories || []}
                    body={directive.body || []}
                    status={directive.status}
                    feedback={directive.feedback}
                  />
                );
              } else {
                return (
                  <DirectiveCard
                    key={JSON.stringify(relevantDirectives)}
                    page="delegate"
                    variant="custom"
                    id={directive.submissionID}
                    author={directive.author}
                    body={directive.body || []}
                    status={directive.status}
                    feedback={directive.feedback}
                  />
                );
              }
            })
            .concat(<div style={{ width: "100%", height: 20 }} />)}
        </div>
      ) : (
        <div className="history-no-submissions-block">No Submissions</div>
      )}
    </div>
  );
};

export default HistorySidebar;
