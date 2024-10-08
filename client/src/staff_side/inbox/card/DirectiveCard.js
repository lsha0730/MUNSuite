import React, { useState } from "react";
import "./DirectiveCard.scoped.css";
import { BsPeopleFill, BsEyeglasses, BsPersonFill } from "react-icons/bs";
import { BiUndo } from "react-icons/bi";
import Popout from "../popup/Popout";
import { highlight } from "../../../common/utils/utils";
import CardButtons from "./CardButtons";
import StatusIndicator from "./StatusIndicator";

function DirectiveCard({
  page,
  variant,
  index,
  id,
  title,
  type,
  author,
  sponsors,
  signatories,
  body,
  updateCards,
  revertDirective,
  search,
  status,
  feedback,
  isOpen,
}) {
  const h = (text) => (search ? highlight(text, search) : text);
  const [presenting, setPresenting] = useState(false);
  const [extended, setExtended] = isOpen ? [true, () => {}] : useState(false);

  const processDirective = (action, feedback) => {
    updateCards(action, id, feedback);
  };

  const presentDirective = () => {
    setPresenting(!presenting);
  };

  return (
    <div
      className="card-container"
      style={{
        marginRight: ["history", "delegate"].includes(page) ? 0 : 20,
        height: page === "delegate" ? "fit-content" : "100%",
        minWidth: page === "delegate" ? "100%" : 350,
        maxWidth: page === "delegate" ? "100%" : 350,
      }}
    >
      {presenting && (
        <Popout
          variant={variant}
          body={body}
          id={id}
          signatories={signatories}
          title={title}
          type={type}
          sponsors={sponsors}
          author={author}
        />
      )}

      {page == "inbox" && (
        <CardButtons
          {...{
            processDirective,
            presentDirective,
          }}
        />
      )}

      {page == "history" && (
        <div className="btts-right">
          <div
            className="btt-revert"
            onClick={() => {
              revertDirective(index);
            }}
          >
            <p className="btt-revert-text">Revert to Inbox</p>
            <BiUndo size={20} />
          </div>
        </div>
      )}

      {variant == "custom" && (
        <div
          className={
            page === "delegate" && !extended
              ? "custom-top rounded"
              : "custom-top"
          }
          style={{
            cursor: page === "delegate" && !isOpen ? "pointer" : undefined,
          }}
          onClick={() => {
            setExtended(!extended);
          }}
        >
          <BsPersonFill size={30} className="custom-icon" />
          <p className="author">{h(author)}</p>
          <p className="custom-id-tag">ID: {h(id)}</p>

          {["delegate", "history"].includes(page) && (
            <StatusIndicator
              status={status}
              feedback={feedback}
              cardExtended={extended}
            />
          )}
        </div>
      )}

      {variant == "standard" && (
        <div
          className={
            page === "delegate" && !extended
              ? "standard-top rounded"
              : "standard-top"
          }
          style={{
            backgroundColor: type?.includes("Private") ? "#285e86" : "#3C8CC9",
            cursor: page === "delegate" && !isOpen ? "pointer" : undefined,
          }}
          onClick={() => {
            setExtended(!extended);
          }}
        >
          <p
            className="title"
            style={page === "inbox" ? { marginRight: 0 } : {}}
          >
            {h(title)}
          </p>

          <div className="card-top-bottom">
            <p className="type">{h(type)}</p>
            <p className="id-tag">ID: {h(id)}</p>
          </div>

          {["delegate", "history"].includes(page) && (
            <StatusIndicator
              status={status}
              feedback={feedback}
              cardExtended={extended}
            />
          )}
        </div>
      )}

      <div
        className={
          page === "delegate" && variant === "standard"
            ? extended
              ? "collapsable"
              : "collapsable collapsed"
            : ""
        }
        style={Object.assign(
          {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          },
          page !== "delegate" ? { height: 1 } : {}
        )}
      >
        {variant == "standard" && (
          <div className="card-tie">
            <div className="tie-set">
              <BsPeopleFill size={15} className="tie-icon" />
              <p>{h(sponsors.join(", "))}</p>
            </div>
            {signatories && signatories.length > 0 ? (
              <div className="tie-set">
                <BsEyeglasses size={18} className="tie-icon" />
                <p className="signatories-list">{h(signatories.join(", "))}</p>
              </div>
            ) : (
              <div />
            )}
          </div>
        )}

        <div
          className={
            page === "delegate" && variant === "custom"
              ? extended
                ? "delcard-body"
                : "delcard-body-collapsed"
              : "card-body"
          }
        >
          {body.map((block) => {
            switch (block.type) {
              case "select-multiple":
                return (
                  <div>
                    <p className="block-heading">{h(block.heading)}</p>
                    <p className="block-text">
                      {h(block.value ? block.value.join(", ") : "None")}
                    </p>
                  </div>
                );
              case "multiplechoice":
                return (
                  <div>
                    <p className="block-heading">{h(block.heading)}</p>
                    <p className="block-text">
                      {h(block.value ? block.value.join(", ") : "None")}
                    </p>
                  </div>
                );
              default:
                return (
                  <div>
                    <p className="block-heading">{h(block.heading)}</p>
                    <p className="block-text">{h(block.value)}</p>
                  </div>
                );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default DirectiveCard;
