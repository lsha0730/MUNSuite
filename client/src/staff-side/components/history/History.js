import React, { useEffect, useState, useContext } from "react";
import styles from "./History.module.css";
import { appContext } from "../../staffContext";
import { GoSearch } from "react-icons/go";
import { FaFilter } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { Confirmation } from "../modal-ui/modal-ui";
import Dropdown from "./Dropdown";
import DirectiveCard from "../inbox/components/DirectiveCard";
import { exportProcesseds } from "../../utils";
import CardbarList from "./CardbarList";
import { IoIosLock } from "react-icons/io";

function History() {
  const { pendings, processed, writeToFirebase, accountInfo } = useContext(
    appContext
  );
  const [selection, setSelection] = useState(0);
  const [search, setSearch] = useState("");
  const [dropdownValue, setDropdownValue] = useState("No Filter");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleArrowKey);
    return () => {
      document.removeEventListener("keydown", handleArrowKey);
    };
  }, []);

  return (
    <div className={styles.history_container}>
      {modal ? (
        <Confirmation
          fn={handleClear}
          bttLabel="Clear History"
          description="Clearing your history will permanently remove your history and clear all delegate statistics. Consider exporting a local copy first."
          setModal={setModal}
        />
      ) : (
        <></>
      )}

      <div className={styles.UI_left}>
        <div className={styles.UI_topright}>
          <div className={styles.filter_group}>
            <FaFilter size={15} className={styles.filter_icon} />
            <Dropdown
              options={["No Filter", "Passed", "Failed"]}
              setSelection={setDropdownValue}
            />
          </div>
          <div className={styles.searchbar}>
            <input
              type="text"
              placeholder="Search by keyword"
              className={styles.subbar}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <GoSearch size={15} className={styles.search_icon} />
          </div>
        </div>
        <div className={styles.cardbar_deck_container}>
          <CardbarList
            search={search}
            filter={dropdownValue}
            selection={selection}
            setSelection={setSelection}
          />
        </div>
      </div>

      <div className={styles.UI_right}>
        <div className={styles.card_container}>{getCardRender()}</div>
        <div className={styles.history_operations}>
          <div
            className={styles.btt_clear_history}
            onClick={() => {
              setModal(true);
            }}
          >
            Clear History
          </div>

          {accountInfo.type === "Premium" ? (
            <div
              className={styles.btt_export_history}
              onClick={() => {
                exportProcesseds(processed);
              }}
            >
              <BsDownload size={18} />
              <p>Export All (.csv)</p>
            </div>
          ) : (
            <div className={styles.btt_bricked}>
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
        setSelection((prev) => Math.min(prev + 1, processed.length - 1));
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
    let directive = processed.slice().reverse()[selection];

    if (directive == null) {
      return <div className={styles.no_selection_card}>No Selection</div>;
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

export default History;
