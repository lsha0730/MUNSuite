import React from "react";
import "./PlanCards.scoped.css";
import { Link } from "react-router-dom";
import SingleFill from "../../../common/assets/icons/single_fill.svg";
import FlyingDark from "../../../common/assets/icons/flying_dark.svg";
import { MAX_SUBMISSIONS } from "../../../staff_side/plan/Plan";
import FeatureList from "./feature_list/FeatureList";

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
              `Store up to ${MAX_SUBMISSIONS} submissions`,
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
            <h1 className="price-tag">$10</h1>
            <p className="price-subtag">3 months access</p>
          </div>

          <FeatureList
            items={[
              "Unlimited submissions storage",
              "Spreadsheet import delegates",
              "Export directives history & notes to csv",
              "Remove starter banner",
            ]}
          />

          <Link to="/prepayment" className="btt-full">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlanCards;
