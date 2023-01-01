import React, { useState } from "react";
import { BiUndo } from "react-icons/bi";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { IoIosFastforward } from "react-icons/io";
import { MdOutlinePresentToAll } from "react-icons/md";
import "./CardButtons.scoped.css";

const CardButtons = ({ processDirective, presentDirective }) => {
  const [confirming, setConfirming] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleConfirm = () => {
    processDirective(confirming.toLowerCase(), feedback);
  };

  return confirming ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="confirm-container">
        {confirming && (
          <div
            className={`btt-2 confirm-${confirming.toLowerCase()}`}
            onClick={handleConfirm}
          >
            <h3 className="btt-2-text">
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
          className="btt-2 confirm-cancel"
          onClick={() => {
            setConfirming(false);
          }}
        >
          <h3 className="btt-2-text">Cancel</h3>
          <BiUndo size={20} />
        </div>
      </div>

      <textarea
        type="text"
        className="feedback-field"
        placeholder="Add feedback (optional)"
        onChange={(e) => {
          setFeedback(e.target.value);
        }}
      />
    </div>
  ) : (
    <div className="card-operations">
      <div
        className="btt-1 btt-present"
        onClick={() => {
          if (!confirming) presentDirective();
        }}
      >
        <MdOutlinePresentToAll size={23} />
      </div>

      <div className="btts-right">
        <div
          className="btt-1 btt-pass"
          onClick={() => {
            setConfirming("Pass");
          }}
        >
          <BsCheckLg size={20} />
        </div>
        <div
          className="btt-1 btt-fail"
          onClick={() => {
            setConfirming("Fail");
          }}
        >
          <BsXLg size={20} />
        </div>
        <div
          className="btt-1 btt-table"
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
