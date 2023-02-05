import React from "react";
import "./PlanCards.scoped.css";
import { Link } from "react-router-dom";
import { BsCheck } from "react-icons/bs";
import SingleFill from "./icons/SingleFill.svg";
import FlyingDark from "./icons/FlyingDark.svg";
import { MAX_SUBMISSIONS } from "../../staff-side/components/plan/Plan";

const PlanCards = ({ page }) => {
  return (
    <div className={`cards-container ${page === "app" ? "app-container" : ""}`}>
      <div className="card">
        <div className="card-tie" style={{ backgroundColor: "#F3F3F3" }}>
          <img
            className="icon noselect"
            src={SingleFill}
            style={{ height: 40 }}
          />
          <p className="card-heading">Starter</p>
          <p className="card-subheading">
            For small conferences, school clubs, or student groups
          </p>
        </div>

        <div className="card-body">
          <h1 className="price-tag">Free</h1>

          <FeatureList
            items={[
              `${MAX_SUBMISSIONS} submissions at a time`,
              "Email support",
            ]}
          />

          {page === "app" ? (
            <div className="btt-bricked">Current Plan</div>
          ) : (
            <Link to="/register" className="btt-demo">
              Make an account
            </Link>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-tie">
          <img
            className="icon noselect"
            src={FlyingDark}
            style={{ height: 50 }}
          />
          <p className="card-heading" style={{ color: "#378DCC" }}>
            Premium
          </p>
          <p className="card-subheading" style={{ color: "#378DCC" }}>
            For bigger, more serious applications
          </p>
        </div>

        <div className="card-body">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="price-tag">$5</h1>
            <p className="price-subtag">2 months access</p>
          </div>

          <FeatureList
            items={[
              "Unlimited submissions",
              "Spreadsheet import delegates",
              "Export directives history & notes to csv",
              "Remove starter banner",
            ]}
          />

          <a
            href="https://buy.stripe.com/bIY8z09RUfnPg0MeUU"
            target="_blank"
            className="btt-full"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

const FeatureList = ({ items }) => {
  return (
    <div className="list-container">
      {items.map((e) => (
        <div className="list-item">
          <BsCheck size={16} className="list-check" />
          <p className="list-text">{e}</p>
        </div>
      ))}
    </div>
  );
};

export default PlanCards;
