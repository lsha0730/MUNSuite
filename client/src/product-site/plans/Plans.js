import React from "react";
import styles from "./Plans.module.css";
import PlanCards from "./PlanCards";

import Horizons from "../home/images/logos/horizons.png";
import CAHSMUN from "../home/images/logos/cahsmun.png";
import VMUN from "../home/images/logos/vmun.png";
import TMUN from "../home/images/logos/tmun.png";

function Plans() {
  return (
    <div className={styles.options_container}>
      <div className={styles.top}>
        <div className={styles.top_container}>
          <p className={styles.header}>
            The all-in-one package for perfectly smooth crises.
          </p>

          <div
            style={{ width: "100%", display: "flex", alignItems: "flex-start" }}
          >
            <div className={styles.trusted_by}>
              <p className={styles.trusted_text}>Trusted by partners at</p>
              <div className={styles.logos}>
                <img className={styles.logo} src={CAHSMUN} />
                <img className={styles.logo} src={Horizons} />
                <img className={styles.logo} src={VMUN} />
                <img className={styles.logo} src={TMUN} />
              </div>
            </div>
          </div>

          <PlanCards page={"plan"} />
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottom_container}>
          <p className={styles.bottom_header}>Payment Details</p>
          <ul style={{ marginLeft: 30 }}>
            <div className={styles.nowrap}>
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
          <p className={styles.bottom_disclaimer}>
            All payments are handled securely using&nbsp;
            <a className={styles.red_highlight} href="http://stripe.com">
              Stripe.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Plans;
