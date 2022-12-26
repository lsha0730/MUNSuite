import React, { useEffect, useState, useContext } from "react";
import "./History.scoped.css";
import { appContext } from "../../staffContext";
import { GoSearch } from "react-icons/go";
import { FaFilter } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { Confirmation } from "../modal-ui/modal-ui";
import Dropdown from "./Dropdown";
import Cardbar from "./Cardbar";
import DirectiveCard from "../inbox/components/DirectiveCard";
import { exportProcesseds, flattenToString } from "../../utils";

function History() {
  const { pendings } = useContext(appContext);
  const { processed } = useContext(appContext);
  const { writeToFirebase } = useContext(appContext);
  const [cardArrRender, setCardArrRender] = useState([]);
  const [selection, setSelection] = useState(0);
  const [search, setSearch] = useState("");
  const [dropdownValue, setDropdownValue] = useState("No Filter");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    let reverseArr = processed.slice().reverse();
    let renderArr = [];
    const lowerSearch = search.toLowerCase();

    for (let i = 0; i < reverseArr.length; i++) {
      const card = reverseArr[i];
      const cardStringLower = flattenToString(card).toLowerCase();
      const filterBoolean =
        card.status == dropdownValue || dropdownValue == "No Filter";
      const includesSearchKey = cardStringLower.includes(lowerSearch);
      const shouldInclude = filterBoolean && includesSearchKey;
      if (card.standard) {
        if (shouldInclude) {
          renderArr.push(
            <Cardbar
              type="standard"
              selected={selection == i}
              status={card.status}
              onClick={() => setSelection(i)}
              title={card.title}
              search={search}
            />
          );
        }
      } else {
        if (
          filterBoolean &&
          (search === "" ||
            `Submission ${card.submissionID}`
              .toLowerCase()
              .includes(search.toLowerCase()))
        ) {
          renderArr.push(
            <Cardbar
              type="custom"
              selected={selection == i}
              status={card.status}
              onClick={() => setSelection(i)}
              submissionID={card.submissionID}
              author={card.author}
              search={search}
            />
          );
        }
      }
    }

    setCardArrRender(renderArr);
  }, [search, processed, selection, dropdownValue]);

  useEffect(() => {}, [selection, processed]);

  return (
    <div className="history-container">
      {modal ? (
        <Confirmation
          function={handleClear}
          bttLabel="Clear History"
          description="Clearing your history will permanently remove your history and clear all delegate statistics. Consider exporting a local copy first."
          setModal={setModal}
        />
      ) : (
        <></>
      )}

      <div className="UI-left">
        <div className="UI-topright">
          <div className="filter-group">
            <FaFilter size={15} className="filter-icon" />
            <Dropdown
              options={["No Filter", "Passed", "Failed"]}
              setSelection={setDropdownValue}
            />
          </div>
          <div className="searchbar">
            <input
              type="text"
              placeholder="Search by keyword"
              className="subbar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <GoSearch size={15} className="search-icon" />
          </div>
        </div>
        <div className="cardbar-deck-container">
          {cardArrRender.length != 0 ? (
            cardArrRender
          ) : (
            <div className="no-cards-box">No processed cards</div>
          )}
        </div>
      </div>

      <div className="UI-right">
        <div className="card-container">{getCardRender()}</div>
        <div className="history-operations">
          <div
            className="btt-clear-history"
            onClick={() => {
              setModal(true);
            }}
          >
            Clear History
          </div>
          <div className="btt-export-history" onClick={exportProcesseds}>
            <BsDownload size={18} />
            <p>Export All (.csv)</p>
          </div>
        </div>
      </div>
    </div>
  );

  function revertDirective(index) {
    const toRevert = processed[index];
    writeToFirebase("pendings", [toRevert].concat(pendings));
    writeToFirebase("processed", processed.filter((item) => item !== toRevert));
  }

  function handleClear() {
    writeToFirebase("processed", []);
  }

  function getCardRender() {
    let directive = processed.slice().reverse()[selection];

    if (directive == null) {
      return <div className="no-selection-card">No Selection</div>;
    } else {
      if (directive.standard) {
        return (
          <DirectiveCard
            variant="standard"
            key={directive.submissionID}
            id={directive.submissionID}
            title={directive.title}
            type={directive.type}
            sponsors={directive.sponsors}
            signatories={directive.signatories}
            body={directive.body || []}
            page={"history"}
            revertDirective={revertDirective}
            index={processed.length - 1 - selection}
            search={search}
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
            page={"history"}
            revertDirective={revertDirective}
            index={processed.length - 1 - selection}
            search={search}
          />
        );
      }
    }
  }
}

export default History;
