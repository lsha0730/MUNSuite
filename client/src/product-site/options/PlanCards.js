import React from "react";
import "./PlanCards.scoped.css";
import { Link } from "react-router-dom";
import { BsCheck } from "react-icons/bs";
import SingleFill from "./icons/SingleFill.svg";
import FlyingDark from "./icons/FlyingDark.svg";

const PlanCards = ({ page }) => {
  return (
    <div className={`cards-container ${page === "app" ? "app-container" : ""}`}>
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

          <FeatureList items={["Up to 75 submissions", "Email support"]} />

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
  );
};

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

export default PlanCards;
