import React, { useState, useEffect } from "react";
import styles from "./Popout.module.css";
import { BsEyeglasses, BsPeopleFill, BsPersonFill } from "react-icons/bs";
import NewWindow from "react-new-window";

function Popout({
  variant,
  body,
  id,
  signatories,
  title,
  type,
  sponsors,
  author,
}) {
  const [bodyRenders, setBodyRenders] = useState();

  useEffect(() => {
    setBodyRenders(
      body.map((block) => {
        switch (block.type) {
          case "select-multiple":
            return (
              <div>
                <p className={styles.block_heading}>{block.heading}</p>
                <p className={styles.block_text}>
                  {block.value ? block.value.join(", ") : "None"}
                </p>
              </div>
            );
          case "multiplechoice":
            return (
              <div>
                <p className={styles.block_heading}>{block.heading}</p>
                <p className={styles.block_text}>
                  {block.value ? block.value.join(", ") : "None"}
                </p>
              </div>
            );
          default:
            return (
              <div>
                <p className={styles.block_heading}>{block.heading}</p>
                <p className={styles.block_text}>{block.value}</p>
              </div>
            );
        }
      })
    );
  }, []);

  return (
    <NewWindow>
      {variant == "custom" && (
        <div className={styles.custom_top}>
          <BsPersonFill size={30} className={styles.custom_icon} />
          <p className={styles.author}>{author}</p>
          <p className={styles.custom_id_tag}>ID: {id}</p>
        </div>
      )}

      {variant == "standard" && (
        <div
          className={styles.standard_top}
          style={{ backgroundColor: type == "Public" ? "#3C8CC9" : "#285e86" }}
        >
          <div className={styles.card_top_top}>
            <p className={styles.title}>{title}</p>
          </div>

          <div className={styles.card_top_bottom}>
            <p className={styles.type}>{type}</p>
            <p className={styles.id_tag}>ID: {id}</p>
          </div>
        </div>
      )}

      {variant == "standard" && (
        <div className={styles.card_tie}>
          <div className={styles.tie_set}>
            <BsPeopleFill size={25} className={styles.tie_icon} />
            <p>{sponsors.join(", ")}</p>
          </div>
          {signatories && signatories.length > 0 ? (
            <div className={styles.tie_set}>
              <BsEyeglasses size={30} className={styles.tie_icon} />
              <p className={styles.signatories_list}>
                {signatories.join(", ")}
              </p>
            </div>
          ) : (
            <div />
          )}
        </div>
      )}

      <div className={styles.card_body}>{bodyRenders}</div>
    </NewWindow>
  );
}

export default Popout;
