import "./Plans.scoped.css";
import TierCard from "./tier_card/TierCard";

import Horizons from "../../common/assets/images/customer_logos/horizons.png";
import CAHSMUN from "../../common/assets/images/customer_logos/cahsmun.png";
import VMUN from "../../common/assets/images/customer_logos/vmun.png";
import TMUN from "../../common/assets/images/customer_logos/tmun.png";

const CUSTOMER_LOGOS = [Horizons, CAHSMUN, VMUN, TMUN];

const Plans = () => {
  return (
    <div className="container">
      <div className="top">
        <div className="top_content">
          <h1 className="header">
            The all-in-one package for perfectly smooth crises.
          </h1>

          <div className="customers">
            <p className="customers_preface">Trusted by partners at</p>
            <div className="logos noselect">
              {CUSTOMER_LOGOS.map((logo) => (
                <img className="logo" src={logo} />
              ))}
            </div>
          </div>

          <div className="tiercards">
            <TierCard tier="starter" />
            <TierCard tier="premium" />
          </div>
        </div>
      </div>

      <div className="bottom">
        <div className="bottom_content">
          <p className="bottom_header">Payment Details</p>
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
          <p className="disclaimer">
            All payments are handled securely using&nbsp;
            <a className="red_highlight" href="http://stripe.com">
              Stripe.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Plans;
