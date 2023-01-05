import React from "react";
import "./Options.scoped.css";
import { Link } from "react-router-dom";
import { BsCheck } from "react-icons/bs";
import SingleFill from "./icons/SingleFill.svg";
import FlyingDark from "./icons/FlyingDark.svg";

function Options() {
  return (
    <div className="options-container">
      <div className="top">
        <div className="top-container">
          <p className="header">
            The all-in-one package for perfectly smooth crises.
          </p>

          <div className="cards-container">
            <div className="card">
              <div className="card-tie" style={{ backgroundColor: "#F3F3F3" }}>
                <img className="icon" src={SingleFill} style={{ height: 40 }} />
                <p className="card-heading">Starter</p>
                <p className="card-subheading">
                  For small conferences, school clubs, or student groups
                </p>
              </div>

              <div className="card-body">
                <h1 className="price-tag">Free</h1>

                <FeatureList
                  items={["Up to 75 submissions", "Email support"]}
                />

                <Link to="/register" className="btt-demo">
                  Make an account
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-tie">
                <img className="icon" src={FlyingDark} style={{ height: 50 }} />
                <p className="card-heading" style={{ color: "#378DCC" }}>
                  Premium
                </p>
                <p className="card-subheading" style={{ color: "#378DCC" }}>
                  For bigger, more serious applications
                </p>
              </div>

              <div className="card-body">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h1 className="price-tag">$10</h1>
                  <p className="price-subtag">3 months access</p>
                </div>

                <FeatureList
                  items={[
                    "Unlimited submissions",
                    "Auto-collected statistics",
                    "Searchable notepad",
                    "Spreadsheet import delegates",
                  ]}
                />

                <a
                  href="https://buy.stripe.com/bIY8z09RUfnPg0MeUU"
                  className="btt-full"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
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

const FeatureList = ({ items }) => {
  return (
    <div>
      {items.map((e) => (
        <div className="list-item">
          <BsCheck size={16} />
          <p className="list-text">{e}</p>
        </div>
      ))}
    </div>
  );
};

export default Options;
