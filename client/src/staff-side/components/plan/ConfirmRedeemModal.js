import React from "react";
import "./Plan.scoped.css";

import FlyingDark from "../../../product-site/options/icons/FlyingDark.svg";

const ConfirmRedeemModal = ({ setShowingConfirmation }) => {
  const date = new Date();
  const expiration = `${date.getFullYear()}/${date.getMonth() +
    4}/${date.getDay() + 1}`;

  return (
    <div className="modal-fade">
      <div className="modal-container">
        <h1 style={{ color: "#378DCC" }}>Success!</h1>
        <p>You are now on the Premium Plan.</p>

        <div className="modal-bottom">
          <img src={FlyingDark} className="modal-icon" />
          <p className="expiration">
            Premium until:&nbsp;
            <p style={{ fontWeight: 600 }}>{expiration}</p>
          </p>
          <div
            className="btt-ok"
            onClick={() => {
              setShowingConfirmation(false);
            }}
          >
            Got it
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRedeemModal;
