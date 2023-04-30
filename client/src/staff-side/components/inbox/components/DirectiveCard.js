import React, { useState } from "react";
import styles from "./DirectiveCard.module.css";
import { BsPeopleFill, BsEyeglasses, BsPersonFill } from "react-icons/bs";
import { BiUndo } from "react-icons/bi";
import Popout from "./Popout";
import { highlight } from "../../../utils";
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
      className={styles.card_container}
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
        <div className={styles.btts_right}>
          <div
            className={styles.btt_revert}
            onClick={() => {
              revertDirective(index);
            }}
          >
            <p className={styles.btt_revert_text}>Revert to Inbox</p>
            <BiUndo size={20} />
          </div>
        </div>
      )}

      {variant == "custom" && (
        <div
          className={`${styles.custom_top} ${
            page === "delegate" && !extended ? styles.rounded : ""
          }`}
          style={{
            cursor: page === "delegate" && !isOpen ? "pointer" : undefined,
          }}
          onClick={() => {
            setExtended(!extended);
          }}
        >
          <BsPersonFill size={30} className={styles.custom_icon} />
          <p className={styles.author}>{h(author)}</p>
          <p className={styles.custom_id_tag}>ID: {h(id)}</p>

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
          className={`${styles.standard_top} ${
            page === "delegate" && !extended ? styles.rounded : ""
          }`}
          style={{
            backgroundColor: type?.includes("Private") ? "#285e86" : "#3C8CC9",
            cursor: page === "delegate" && !isOpen ? "pointer" : undefined,
          }}
          onClick={() => {
            setExtended(!extended);
          }}
        >
          <p
            className={styles.title}
            style={page === "inbox" ? { marginRight: 0 } : {}}
          >
            {h(title)}
          </p>

          <div className={styles.card_top_bottom}>
            <p className={styles.type}>{h(type)}</p>
            <p className={styles.id_tag}>ID: {h(id)}</p>
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
        className={`${styles.collapsable} ${
          page === "delegate" && variant === "standard" && !extended
            ? styles.collapsed
            : ""
        }`}
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
          <div className={styles.card_tie}>
            <div className={styles.tie_set}>
              <BsPeopleFill size={15} className={styles.tie_icon} />
              <p>{h(sponsors.join(", "))}</p>
            </div>
            {signatories && signatories.length > 0 ? (
              <div className={styles.tie_set}>
                <BsEyeglasses size={18} className={styles.tie_icon} />
                <p className={styles.signatories_list}>
                  {h(signatories.join(", "))}
                </p>
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
                ? styles.delcard_body
                : stykes.delcard_body_collapsed
              : styles.card_body
          }
        >
          {body.map((block) => {
            switch (block.type) {
              case "select-multiple":
                return (
                  <div>
                    <p className={styles.block_heading}>{h(block.heading)}</p>
                    <p className={styles.block_text}>
                      {h(block.value ? block.value.join(", ") : "None")}
                    </p>
                  </div>
                );
              case "multiplechoice":
                return (
                  <div>
                    <p className={styles.block_heading}>{h(block.heading)}</p>
                    <p className={styles.block_text}>
                      {h(block.value ? block.value.join(", ") : "None")}
                    </p>
                  </div>
                );
              default:
                return (
                  <div>
                    <p className={styles.block_heading}>{h(block.heading)}</p>
                    <p className={styles.block_text}>{h(block.value)}</p>
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
