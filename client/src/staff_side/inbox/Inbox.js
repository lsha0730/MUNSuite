import React, { useEffect, useState, useContext } from "react";
import "./Inbox.scoped.css";
import { appContext } from "../staffContext";
import Dropdown from "../history/dropdown/Dropdown";
import { FaFilter } from "react-icons/fa";
import DirectiveCard from "./card/DirectiveCard";
import Toggle from "../../common/components/toggle/Toggle";

function Inbox() {
  const { processed, pendings, settings, writeToFirebase } = useContext(
    appContext
  );
  const [accepting, setAccepting] = useState(
    settings.formOpen !== undefined ? settings.formOpen : true
  );
  const [dropdownValue, setDropdownValue] = useState("No Filter");

  useEffect(() => {
    console.log(accepting);
  }, [accepting]);

  useEffect(() => {
    const copy = JSON.parse(
      JSON.stringify({
        ...settings,
        formOpen: accepting,
      })
    );
    writeToFirebase("settings", copy);
  }, [accepting]);

  const directivesToDisplay = pendings.filter(includeInFilter);

  return (
    <div className="inbox-container">
      <div className="UI-top">
        <div className="filter-container">
          <FaFilter size={15} style={{ marginRight: 10, fill: "#BCBCBC" }} />
          <Dropdown
            options={getFilterOptions(pendings)}
            setSelection={setDropdownValue}
          />
        </div>
        <p className="card-count">{pendings.length} in Queue</p>
        <div className="left-spacer">
          <Toggle
            value={accepting}
            onValue={setAccepting}
            label={{
              on: "Form Active",
              off: "Form Inactive",
              direction: "left",
            }}
          />
        </div>
      </div>
      <div className="UI-bottom">
        <div className="spacer" />
        {directivesToDisplay.length > 0 ? (
          directivesToDisplay.map((directive) =>
            directive.standard ? (
              <DirectiveCard
                variant="standard"
                key={directive.submissionID}
                id={directive.submissionID}
                title={directive.title}
                type={directive.type}
                sponsors={directive.sponsors || []}
                signatories={directive.signatories || []}
                body={directive.body || []}
                updateCards={updateCards}
                page="inbox"
              />
            ) : (
              <DirectiveCard
                variant="custom"
                key={directive.submissionID}
                id={directive.submissionID}
                author={directive.author}
                body={directive.body || []}
                updateCards={updateCards}
                page="inbox"
              />
            )
          )
        ) : (
          <div className="no-cards-box">No pending submissions</div>
        )}
        <div className="spacer2" />
      </div>
    </div>
  );

  function includeInFilter(directive) {
    switch (dropdownValue) {
      case "No Filter":
        return true;
      case "Custom Submission":
        return !directive.standard;
      default:
        return directive && directive?.type == dropdownValue;
    }
  }

  function updateCards(operation, submissionID, feedback) {
    let cardIndex = pendings.findIndex((e) => e.submissionID === submissionID);

    let tempArr = pendings.slice();
    switch (operation) {
      case "pass":
        let passedCard = tempArr.splice(cardIndex, 1)[0];
        passedCard.status = "Passed";
        if (feedback) passedCard.feedback = feedback;
        pushToProcessed(passedCard);
        break;
      case "fail":
        let failedCard = tempArr.splice(cardIndex, 1)[0];
        failedCard.status = "Failed";
        if (feedback) failedCard.feedback = feedback;
        pushToProcessed(failedCard);
        break;
      case "table":
        let tempObj = tempArr[cardIndex];
        tempArr.splice(cardIndex, 1);
        tempArr.push(tempObj);
    }

    function pushToProcessed(card) {
      let tempProcessedArr = processed.slice();
      tempProcessedArr.push(card);
      writeToFirebase("processed", tempProcessedArr);
    }

    writeToFirebase("pendings", tempArr);
  }

  function getFilterOptions(cards) {
    const set = new Set();

    cards.forEach((card) => {
      if (card.standard) {
        set.add(card.type);
      } else if (!card.standard) {
        set.add("Custom Submission");
      }
    });

    return ["No Filter"].concat(Array.from(set));
  }
}

export default Inbox;
