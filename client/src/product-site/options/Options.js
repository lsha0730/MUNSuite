import React from "react";
import "./Options.scoped.css";
import PlanCards from "./PlanCards";

function Options() {
  return (
    <div className="options-container">
      <div className="top">
        <div className="top-container">
          <p className="header">
            The all-in-one package for perfectly smooth crises.
          </p>
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

export default Options;
