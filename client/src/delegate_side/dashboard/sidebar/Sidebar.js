import React, { useState, useEffect, useContext, useRef } from "react";
import { delegateContext } from "../../../common/Context";
import DirectiveCard from "../../../staff_side/inbox/card/DirectiveCard";
import "./Sidebar.scoped.css";
import { FaHistory } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";

const Sidebar = ({ draft }) => {
  const {
    firebaseData: { pendings, processed, settings },
    delegateAPI: { user },
  } = useContext(delegateContext);
  const isNarrow = useMediaQuery({ query: "(max-width: 850px)" });
  const [relevantDirectives, setRelevantDirectives] = useState([]);
  const [open, setOpen] = useState(!isNarrow);
  const [page, setPage] = useState("Submissions");
  const code = sessionStorage.getItem("code") || user.code;
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
          return item.sponsors.includes(user.name) || item.author == user.name;
        } else {
          return item.author == user.name;
        }
      });
    setRelevantDirectives(
      relevants.sort((a, b) => b.submissionID - a.submissionID)
    );
  }, [pendings, processed]);

  return (
    <div
      className="margin-block"
      style={{ marginRight: !open || isNarrow ? 0 : sidebarWidth }}
    >
      <div
        className="history-container"
        style={isNarrow ? { right: open ? 0 : -sidebarWidth } : {}}
      >
        <div
          className={`toggle ${open ? "open" : "closed"}`}
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

        <div className="content" style={{ width: sidebarWidth }}>
          <div className="sidebar-top">
            <div
              className={`btt-page noselect ${
                page === "Submissions" ? "selected" : ""
              }`}
              onClick={() => {
                setPage("Submissions");
              }}
              style={{ marginRight: 5 }}
            >
              <FaHistory
                size={15}
                className={
                  page === "Submissions" ? "btt-icon bold" : "btt-icon"
                }
              />
              <p className="btt-text">Submissions</p>
            </div>
            <div
              className={`btt-page noselect ${
                page === "Draft" ? "selected" : ""
              }`}
              onClick={() => {
                setPage("Draft");
              }}
            >
              <BsPencilSquare
                size={15}
                className={page === "Draft" ? "btt-icon bold" : "btt-icon"}
              />
              <p className="btt-text">Draft Autosave</p>
            </div>
          </div>

          <p className="page-description">
            {page === "Submissions"
              ? `All directives sponsored by you. Click card headers to expand.
            If message icon appears, click the status indicator to see dais feedback.`
              : `Current working draft, autosaves your work anytime the form is suspended. Stores up to 10 drafts.`}
          </p>

          {page === "Submissions" && (
            <>
              {relevantDirectives && relevantDirectives.length > 0 ? (
                <div className="history-cards-container" key="history-cards">
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
                <div className="history-no-submissions-block">
                  No Submissions
                </div>
              )}
            </>
          )}

          {page === "Draft" && (
            <>
              <div className="history-cards-container" key="draft-cards">
                <p className="subheading">Current Draft</p>
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
                <p className="subheading">Autosaved Drafts</p>
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
