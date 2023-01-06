import React, { useContext } from "react";
import PlanCards from "../../../product-site/options/PlanCards";
import { appContext } from "../../staffContext";
import "./Plan.scoped.css";
import { HiBadgeCheck } from "react-icons/hi";

import delegations from "../../../product-site/home/images/mockups/delegations.png";
import form from "../../../product-site/home/images/mockups/form.png";
import history from "../../../product-site/home/images/mockups/history.png";
import statistics from "../../../product-site/home/images/mockups/statistics.png";
import notes from "../../../product-site/home/images/mockups/notes.png";

const MAX_SUBMISSIONS = 75;

const Plan = () => {
  const { pendings, processed, accountInfo } = useContext(appContext);
  const totalSubmissions = pendings?.length + processed?.length;

  return (
    <div className="page-container">
      <div className="innerpage-container">
        <div className="page-header">
          <div className="header-pair">
            <HiBadgeCheck size={30} className="header-icon" />
            <p className="header-text">Your MUNSuite Plan</p>
          </div>
        </div>

        <h1 className="plantype-heading">
          You are currently on the&nbsp;
          <p
            style={{
              color: accountInfo.type === "Premium" ? "#378DCC" : "#000000",
            }}
          >
            {`${accountInfo.type} Plan`}
          </p>
        </h1>

        {accountInfo.type === "Starter" &&
          (totalSubmissions < MAX_SUBMISSIONS ? (
            <>
              <p className="subtext">
                You have used &nbsp;
                <p
                  style={{ color: "#000000", fontWeight: 600 }}
                >{`${totalSubmissions} of ${MAX_SUBMISSIONS}`}</p>
                &nbsp; included submissions.
              </p>
              <p className="subtext">
                To continue after 75 submissions, please clear your account data
                or upgrade to a premium plan.
              </p>
            </>
          ) : (
            <>
              <p
                className="subtext"
                style={{ color: "#FF5A5A", fontWeight: 600 }}
              >
                {`You have used all ${MAX_SUBMISSIONS} included submissions.`}
              </p>
              <p
                className="subtext"
                style={{ color: "#FF5A5A", fontWeight: 600 }}
              >
                No more submissions can be made until either your account data
                is cleared or you upgrade to a premium plan.
              </p>
              <br />
            </>
          ))}

        {accountInfo.type === "Premium" && (
          <>
            <p
              className="subtext"
              style={{ fontWeight: 600, color: "#BCBCBC" }}
            >
              Happy directive processing!
            </p>

            <MockupSplash />
          </>
        )}

        {accountInfo.type === "Starter" && (
          <>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PlanCards page="app" />
            </div>

            <div className="redeem">
              <h1 className="heading">Redeem a Code</h1>
              <div className="redeem-content">
                <p className="subtext">
                  Once you redeem your code, your account will hold premium
                  status for 3 months.
                </p>
                <p className="subtext">
                  After the expiration date, your account will revert back to
                  Starter account status.
                </p>
                <div className="inputs">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter a product code"
                  />
                  <div className="btt-redeem">Redeem</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const MockupSplash = () => {
  return (
    <div className="mockup-container">
      <img
        src={delegations}
        alt="Delegations UI Image"
        className="mockup"
        style={{ position: "absolute", top: "100px", left: "1000px" }}
      />
      <img
        src={form}
        alt="Form UI Image"
        className="mockup"
        style={{
          position: "absolute",
          top: "50px",
          left: "500px",
          zIndex: "1",
        }}
      />
      <img
        src={history}
        alt="History UI Image"
        className="mockup"
        style={{ position: "absolute", top: "300px", left: "350px" }}
      />
      <img
        src={statistics}
        alt="Statistics UI Image"
        className="mockup"
        style={{ position: "absolute", top: "150px", left: "200px" }}
      />
      <img
        src={notes}
        alt="Notes UI Image"
        className="mockup"
        style={{ position: "absolute", top: "300px", left: "700px" }}
      />
    </div>
  );
};

export default Plan;
