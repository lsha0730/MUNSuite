import React from "react";
import styles from "./PlanCards.module.css";
import { Link } from "react-router-dom";
import { BsCheck } from "react-icons/bs";
import SingleFill from "./icons/SingleFill.svg";
import FlyingDark from "./icons/FlyingDark.svg";
import { MAX_SUBMISSIONS } from "../../staff-side/components/plan/Plan";

const PlanCards = ({ page }) => {
  return (
    <div
      className={`${styles.cards_container} ${
        page === "app" ? styles.app_container : ""
      }`}
    >
      <div className={styles.card}>
        <div className={styles.card_tie} style={{ backgroundColor: "#F3F3F3" }}>
          <img
            className={`${styles.icon} ${styles.noselect}`}
            src={SingleFill}
            style={{ height: 40 }}
          />
          <p className={styles.card_heading}>Starter</p>
          <p className={styles.card_subheading}>
            For small conferences, school clubs, or student groups
          </p>
        </div>

        <div className={styles.card_body}>
          <h1 className={styles.price_tag}>Free</h1>

          <FeatureList
            items={[
              `${MAX_SUBMISSIONS} submissions at a time`,
              "Email support",
            ]}
          />

          {page === "app" ? (
            <div className={styles.btt_bricked}>Current Plan</div>
          ) : (
            <Link to="/register" className={styles.btt_demo}>
              Make an account
            </Link>
          )}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.card_tie}>
          <img
            className={`${styles.icon} ${styles.noselect}`}
            src={FlyingDark}
            style={{ height: 50 }}
          />
          <p className={styles.card_heading} style={{ color: "#378DCC" }}>
            Premium
          </p>
          <p className={styles.card_subheading} style={{ color: "#378DCC" }}>
            For bigger, more serious applications
          </p>
        </div>

        <div className={styles.card_body}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className={styles.price_tag}>$10</h1>
            <p className={styles.price_subtag}>3 months access</p>
          </div>

          <FeatureList
            items={[
              "Unlimited submissions",
              "Spreadsheet import delegates",
              "Export directives history & notes to csv",
              "Remove starter banner",
            ]}
          />

          <Link to="/prepayment" className={styles.btt_full}>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeatureList = ({ items }) => {
  return (
    <div className={styles.list_container}>
      {items.map((e) => (
        <div className={styles.list_item}>
          <BsCheck size={16} className={styles.list_check} />
          <p className={styles.list_text}>{e}</p>
        </div>
      ))}
    </div>
  );
};

export default PlanCards;
