import React from "react";
import "./Plans.scoped.css";
import PlanCards from "./PlanCards";

import Horizons from "../home/images/logos/horizons.png";
import CAHSMUN from "../home/images/logos/cahsmun.png";
import VMUN from "../home/images/logos/vmun.png";
import TMUN from "../home/images/logos/tmun.png";

function Plans() {
  return (
    <div className="options-container">
      <div className="top">
        <div className="top-container">
          <p className="header">
            The all-in-one package for perfectly smooth crises.
          </p>

          <div
            style={{ width: "100%", display: "flex", alignItems: "flex-start" }}
          >
            <div className="trusted-by">
              <p className="trusted-text">Trusted by partners at</p>
              <div className="logos">
                <img className="logo" src={CAHSMUN} />
                <img className="logo" src={Horizons} />
                <img className="logo" src={VMUN} />
                <img className="logo" src={TMUN} />
              </div>
            </div>
          </div>

          <PlanCards page={"plan"} />
        </div>
      </div>

      <div className="bottom">
        <div className="bottom-container">
          <p className="bottom-header">Payment Details</p>
          <ul style={{ marginLeft: 30 }}>
            <div className="nowrap">
              <li>This is</li>
              <p style={{ fontWeight: "600" }}>
                &nbsp;not a subscription&nbsp;
              </p>
              <p>and you will not be billed more than once.</p>
            </div>
            <li>
              Upon payment, you will receive an email receipt and your
              redeemable code(s).
            </li>
            <li>
              Codes do not expire and are valid for 3 months after they are
              redeemed.
            </li>
            <li>All sales are final.</li>
          </ul>
          <p className="bottom-disclaimer">
            All payments are handled securely using&nbsp;
            <a className="red-highlight" href="http://stripe.com">
              Stripe.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Plans;
