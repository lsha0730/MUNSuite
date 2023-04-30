import React, { useState, useEffect, useContext, useRef } from "react";
import { delContext } from "../../DelegateContext";
import DirectiveCard from "../../../staff-side/components/inbox/components/DirectiveCard";
import styles from "./Sidebar.module.css";
import { FaHistory } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";

const Sidebar = ({ draft }) => {
  const { pendings, processed, user, settings } = useContext(delContext);
  const isNarrow = useMediaQuery({ query: "(max-width: 850px)" });
  const [relevantDirectives, setRelevantDirectives] = useState([]);
  const [open, setOpen] = useState(!isNarrow);
  const [page, setPage] = useState("Submissions");
  const code = sessionStorage.getItem("code") || user;
  const [autosaves, setAutosaves] = useState(
    JSON.parse(localStorage.getItem(`drafts-${code}`)) || []
  );
  const sidebarWidth = Math.min(window.innerWidth, 400);

  // TODO: Prevents run on mount only sometimes
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      if (settings.formOpen) autosave();
    } else {
      isMounted.current = true;
    }
  }, [settings.formOpen]);

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
    <div
      className={styles.margin_block}
      style={{ marginRight: !open || isNarrow ? 0 : sidebarWidth }}
    >
      <div
        className={styles.history_container}
        style={isNarrow ? { right: open ? 0 : -sidebarWidth } : {}}
      >
        <div
          className={`${styles.toggle} ${open ? styles.open : styles.closed}`}
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? (
            <BiChevronRight size={30} style={{ fill: "#707070" }} />
          ) : (
            <BiChevronLeft size={30} style={{ fill: "#707070" }} />
          )}
        </div>

        <div className={styles.content} style={{ width: sidebarWidth }}>
          <div className={styles.sidebar_top}>
            <div
              className={`${styles.btt_page} ${styles.noselect} ${
                page === "Submissions" ? styles.selected : ""
              }`}
              onClick={() => {
                setPage("Submissions");
              }}
              style={{ marginRight: 5 }}
            >
              <FaHistory
                size={15}
                className={`${styles.btt_icon} ${
                  page === "Submissions" ? styles.bold : ""
                }`}
              />
              <p className={styles.btt_text}>Submissions</p>
            </div>
            <div
              className={`${styles.btt_page} ${styles.noselect} ${
                page === "Draft" ? styles.selected : ""
              }`}
              onClick={() => {
                setPage("Draft");
              }}
            >
              <BsPencilSquare
                size={15}
                className={`${styles.btt_icon} ${
                  page === "Draft" ? styles.bold : ""
                }`}
              />
              <p className={styles.btt_text}>Draft Autosave</p>
            </div>
          </div>

          <p className={styles.page_description}>
            {page === "Submissions"
              ? `All directives sponsored by you. Click card headers to expand.
            If message icon appears, click the status indicator to see dais feedback.`
              : `Current working draft, autosaves your work anytime the form is suspended. Stores up to 10 drafts.`}
          </p>

          {page === "Submissions" && (
            <>
              {relevantDirectives && relevantDirectives.length > 0 ? (
                <div
                  className={styles.history_cards_container}
                  key="history-cards"
                >
                  {relevantDirectives
                    .map((directive) => {
                      if (directive.standard) {
                        return (
                          <DirectiveCard
                            key={directive.submissionID}
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
                            key={directive.submissionID}
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
                <div className={styles.history_no_submissions_block}>
                  No Submissions
                </div>
              )}
            </>
          )}

          {page === "Draft" && (
            <>
              <div className={styles.history_cards_container} key="draft-cards">
                <p className={styles.subheading}>Current Draft</p>
                {draft.standard ? (
                  <DirectiveCard
                    key={`current-draft`}
                    page="delegate"
                    variant="standard"
                    id={draft.submissionID}
                    title={draft.title || "Untitled Directive"}
                    type={draft.type || "No Selection"}
                    sponsors={draft.sponsors || []}
                    signatories={draft.signatories || []}
                    body={draft.body || []}
                    status={"Current"}
                    feedback={draft.feedback}
                  />
                ) : (
                  <DirectiveCard
                    key={`current-draft`}
                    page="delegate"
                    variant="custom"
                    id={draft.submissionID}
                    author={draft.author}
                    body={draft.body || []}
                    status={"Current"}
                    feedback={draft.feedback}
                  />
                )}
                <p className={styles.subheading}>Autosaved Drafts</p>
                {getReversed(autosaves)
                  .map((directive, index) =>
                    directive.standard ? (
                      <DirectiveCard
                        key={`draft-${index}`}
                        page="delegate"
                        variant="standard"
                        id={directive.submissionID}
                        title={directive.title || "Untitled Directive"}
                        type={directive.type || "No Selection"}
                        sponsors={directive.sponsors || []}
                        signatories={directive.signatories || []}
                        body={directive.body || []}
                        status={"Draft"}
                        feedback={directive.feedback}
                      />
                    ) : (
                      <DirectiveCard
                        key={`draft-${index}`}
                        page="delegate"
                        variant="custom"
                        id={directive.submissionID}
                        author={directive.author}
                        body={directive.body || []}
                        status={"Draft"}
                        feedback={directive.feedback}
                      />
                    )
                  )
                  .concat(<div style={{ width: "100%", height: 20 }} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  function getReversed(array) {
    let tempArr = array.slice();
    tempArr.reverse();
    return tempArr;
  }

  function autosave() {
    const currentDrafts =
      JSON.parse(localStorage.getItem(`drafts-${code}`)) || [];
    const newDrafts = currentDrafts.concat(draft).slice(-10);
    localStorage.setItem(`drafts-${code}`, JSON.stringify(newDrafts));
    setAutosaves(newDrafts);
  }
};

export default Sidebar;
