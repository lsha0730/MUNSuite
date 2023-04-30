import React, { useState } from "react";
import { BiUndo } from "react-icons/bi";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { IoIosFastforward } from "react-icons/io";
import { MdOutlinePresentToAll } from "react-icons/md";
import styles from "./CardButtons.module.css";

const CardButtons = ({ processDirective, presentDirective }) => {
  const [confirming, setConfirming] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleConfirm = () => {
    processDirective(confirming.toLowerCase(), feedback);
  };

  return confirming ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={styles.confirm_container}>
        {confirming && (
          <div
            className={`${styles.btt_2} ${
              styles[`confirm_${confirming.toLowerCase()}`]
            }`}
            onClick={handleConfirm}
          >
            <h3 className={styles.btt_2_text}>
              {`Confirm ${confirming}${
                feedback.length > 0 ? " with feedback" : ""
              }`}
            </h3>
            {confirming == "Pass" ? (
              <BsCheckLg size={12} />
            ) : (
              <BsXLg size={12} />
            )}
          </div>
        )}

        <div
          className={`${styles.btt_2} ${styles.confirm_cancel}`}
          onClick={() => {
            setConfirming(false);
          }}
        >
          <h3 className={styles.btt_2_text}>Cancel</h3>
          <BiUndo size={20} />
        </div>
      </div>

      <textarea
        type="text"
        className={styles.feedback_field}
        placeholder="Add feedback (optional)"
        onChange={(e) => {
          setFeedback(e.target.value);
        }}
      />
    </div>
  ) : (
    <div className={styles.card_operations}>
      <div
        className={`${styles.btt_1} ${styles.btt_present}`}
        onClick={() => {
          if (!confirming) presentDirective();
        }}
      >
        <MdOutlinePresentToAll size={23} />
      </div>

      <div className={styles.btts_right}>
        <div
          className={`${styles.btt_1} ${styles.btt_pass}`}
          onClick={() => {
            setConfirming("Pass");
          }}
        >
          <BsCheckLg size={20} />
        </div>
        <div
          className={`${styles.btt_1} ${styles.btt_fail}`}
          onClick={() => {
            setConfirming("Fail");
          }}
        >
          <BsXLg size={20} />
        </div>
        <div
          className={`${styles.btt_1} ${styles.btt_table}`}
          onClick={() => {
            processDirective("table");
          }}
        >
          <IoIosFastforward size={25} />
        </div>
      </div>
    </div>
  );
};

export default CardButtons;
