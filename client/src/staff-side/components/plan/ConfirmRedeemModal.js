import React from "react";
import "./Plan.scoped.css";

import FlyingDark from "../../../product-site/options/icons/FlyingDark.svg";
import { getExpiration } from "../../utils";

const ConfirmRedeemModal = ({ setShowingConfirmation }) => {
  const expiration = getExpiration();

  return (
    <div className="modal-fade">
      <div className="modal-container">
        <h1 style={{ color: "#378DCC", fontSize: 28 }}>Success!</h1>
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
