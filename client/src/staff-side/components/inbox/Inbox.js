import React, { useEffect, useState, useContext } from "react";
import "./Inbox.scoped.css";
import { appContext } from "../../staffContext";
import Dropdown from "../history/Dropdown";
import { FaFilter } from "react-icons/fa";
import DirectiveCard from "./components/DirectiveCard";

function Inbox() {
  const { processed } = useContext(appContext);
  const { pendings } = useContext(appContext);
  const { settings } = useContext(appContext);
  const { writeToFirebase } = useContext(appContext);
  const [accepting, setAccepting] = useState(
    settings.formOpen !== undefined ? settings.formOpen : true
  );
  const [toggleRender, setToggleRender] = useState();
  const [cardArrRender, setCardArrRender] = useState([]);
  const { form } = useContext(appContext);
  const [dropdownValue, setDropdownValue] = useState("No Filter");

  useEffect(() => {
    let toggleOffset = accepting ? 25 : 0;

    setToggleRender(
      <div className="toggle-set" onClick={() => setAccepting(!accepting)}>
        <p className={accepting ? "toggle-text-green" : "toggle-text-red"}>
          {accepting ? "Accepting Responses" : "Form Suspended"}
        </p>
        <div
          className={
            accepting ? "toggle-bar toggle-greenbg" : "toggle-bar toggle-redbg"
          }
        >
          <div
            className={
              accepting
                ? "toggle-circle toggle-greenbtt"
                : "toggle-circle toggle-redbtt"
            }
            style={{ left: toggleOffset }}
          />
        </div>
      </div>
    );

    let tempSettings = settings;
    tempSettings.formOpen = accepting;
    writeToFirebase("settings", JSON.parse(JSON.stringify(tempSettings)));
  }, [accepting]);

  useEffect(() => {
    setCardArrRender(
      pendings.filter(includeInFilter).map((directive) => {
        if (directive.standard) {
          return (
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
          );
        } else {
          return (
            <DirectiveCard
              variant="custom"
              key={directive.submissionID}
              id={directive.submissionID}
              author={directive.author}
              body={directive.body || []}
              updateCards={updateCards}
              page="inbox"
            />
          );
        }
      })
    );
  }, [pendings, dropdownValue]);

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
        {toggleRender}
      </div>
      <div className="UI-bottom">
        <div className="spacer" />
        {cardArrRender.length != 0 ? (
          cardArrRender
        ) : (
          <div className="no-cards-box">No pending submissions</div>
        )}
        <div className="spacer2" />
      </div>
    </div>
  );

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
