import React, { useState, useEffect, useContext, useRef } from "react";
import "./History.scoped.css";
import { appContext } from "../staffContext";
import { GoSearch } from "react-icons/go";
import { FaFilter } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { Confirmation } from "../modals/Modals";
import Dropdown from "./dropdown/Dropdown";
import DirectiveCard from "../inbox/card/DirectiveCard";
import CardbarList from "./cardbar_list/CardbarList";
import { IoIosLock } from "react-icons/io";
import { exportProcesseds, flattenToString } from "../../common/utils/utils";

function History() {
  const { pendings, processed, writeToFirebase, accountInfo } = useContext(
    appContext
  );
  const [selection, setSelection] = useState(0);
  const [search, setSearch] = useState("");
  const [dropdownValue, setDropdownValue] = useState("No Filter");
  const [modal, setModal] = useState(false);

  const reverseProcessed = processed.slice().reverse();
  const filteredProcessed = reverseProcessed.filter((c) =>
    filterBySearchAndFilter(c, dropdownValue, search.toLowerCase())
  );
  const filteredProcessedLengthRef = useRef(filteredProcessed.length);
  useEffect(() => {
    filteredProcessedLengthRef.current = filteredProcessed.length;
  }, [filteredProcessed.length]);

  useEffect(() => {
    document.addEventListener("keydown", handleArrowKey);
    return () => {
      document.removeEventListener("keydown", handleArrowKey);
    };
  }, []);

  return (
    <div className="history-container">
      {modal && (
        <Confirmation
          fn={handleClear}
          bttLabel="Clear History"
          description="Clearing your history will permanently remove your history and clear all delegate statistics. Consider exporting a local copy first."
          setModal={setModal}
        />
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
        <CardbarList
          cards={filteredProcessed}
          search={search}
          selection={selection}
          setSelection={setSelection}
        />
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

          {accountInfo.type === "Premium" ? (
            <div
              className="btt-export-history"
              onClick={() => {
                exportProcesseds(processed);
              }}
            >
              <BsDownload size={18} />
              <p>Export All (.csv)</p>
            </div>
          ) : (
            <div className="btt-bricked">
              <IoIosLock size={18} />
              <p>Export All (.csv)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function handleArrowKey(e) {
    switch (e.key) {
      case "ArrowDown":
        setSelection((prev) =>
          Math.min(prev + 1, filteredProcessedLengthRef.current - 1)
        );
        break;
      case "ArrowUp":
        setSelection((prev) => Math.max(prev - 1, 0));
        break;
    }
  }

  function revertDirective(index) {
    const toRevert = processed[index];
    toRevert.status = "Pending";
    writeToFirebase("pendings", [toRevert].concat(pendings));
    writeToFirebase("processed", processed.filter((item) => item !== toRevert));
  }

  function handleClear() {
    writeToFirebase("processed", []);
  }

  function getCardRender() {
    const directive = filteredProcessed[selection];

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
            status={directive.status}
            feedback={directive.feedback}
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
            status={directive.status}
            feedback={directive.feedback}
          />
        );
      }
    }
  }
}

const filterBySearchAndFilter = (card, filter, lowerSearch) => {
  const cardStringLower = flattenToString(card).toLowerCase();
  const filterBoolean = card.status == filter || filter == "No Filter";
  const includesSearchKey = cardStringLower.includes(lowerSearch);

  return filterBoolean && includesSearchKey;
};

export default History;
