import React, { useState, useContext, useRef, useEffect } from "react";
import { appContext } from "../../staffContext";
import styles from "./Plan.module.css";
import axios from "axios";

import PlanCards from "../../../product-site/plans/PlanCards";
import { ConfirmRedeemModal } from "../modal-ui/modal-ui";

import delegations from "../../../product-site/home/images/mockups/delegations.png";
import form from "../../../product-site/home/images/mockups/form.png";
import history from "../../../product-site/home/images/mockups/history.png";
import statistics from "../../../product-site/home/images/mockups/statistics.png";
import notes from "../../../product-site/home/images/mockups/notes.png";
import { HiBadgeCheck } from "react-icons/hi";

export const MAX_SUBMISSIONS = 100;

const Plan = () => {
  const {
    pendings,
    processed,
    accountInfo,
    setAccountInfo,
    userID,
  } = useContext(appContext);
  const totalSubmissions = pendings?.length + processed?.length;
  const codeRef = useRef();
  const [warning, setWarning] = useState("");
  const [showingConfirmation, setShowingConfirmation] = useState(false);

  const handleRedeem = () => {
    axios
      .post("https://munsuite-backend.onrender.com/account/redeem", {
        code: codeRef?.current?.value,
        uid: userID,
      })
      .then((response) => {
        const data = response.data;
        if (data === "Success") {
          // Check account status again
          axios
            .post("https://munsuite-backend.onrender.com/account/info", {
              uid: userID,
            })
            .then((response) => {
              const data = response.data;
              if (data.type === "Premium") {
                setAccountInfo(data);
                setShowingConfirmation(true);
              }
            });
        } else {
          setWarning(data);
          setTimeout(() => setWarning(""), 2000);
        }
      });
  };

  useEffect(() => {
    axios
      .post("https://munsuite-backend.onrender.com/account/info", {
        uid: userID,
      })
      .then((response) => {
        const data = response.data;
        setAccountInfo(data);
      });
  }, []);

  return (
    <div className={styles.page_container}>
      <div className={styles.innerpage_container}>
        <div className={styles.page_header}>
          <div className={styles.header_pair}>
            <HiBadgeCheck size={30} className={styles.header_icon} />
            <p className={styles.header_text}>Your MUNSuite Plan</p>
          </div>
        </div>

        <h1 className={styles.plantype_heading}>
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
              <p className={styles.subtext}>
                You have used &nbsp;
                <p
                  style={{ color: "#000000", fontWeight: 600 }}
                >{`${totalSubmissions} of ${MAX_SUBMISSIONS}`}</p>
                &nbsp; included submissions.
              </p>
              <p className={styles.subtext}>
                {`To continue after ${MAX_SUBMISSIONS} submissions, please clear your account data
                or upgrade to a premium plan.`}
              </p>
            </>
          ) : (
            <>
              <p
                className={styles.subtext}
                style={{ color: "#FF5A5A", fontWeight: 600 }}
              >
                {`You have used all ${MAX_SUBMISSIONS} included submissions.`}
              </p>
              <p
                className={styles.subtext}
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
              className={styles.subtext}
              style={{ fontWeight: 600, color: "#BCBCBC" }}
            >
              Expiration:&nbsp;
              <p style={{ color: "#707070" }}>{`${accountInfo.expiration?.slice(
                0,
                10
              )}`}</p>
            </p>
            <p
              className={styles.subtext}
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

            <div className={styles.redeem}>
              <h1 className={styles.heading}>Redeem a Code</h1>
              <div className={styles.redeem_content}>
                <p className={styles.subtext}>
                  Once you redeem your code, your account will hold premium
                  status for 3 months.
                </p>
                <p className={styles.subtext}>
                  After the expiration date, your account will revert back to
                  Starter account status.
                </p>
                <div className={styles.inputs}>
                  <input
                    ref={codeRef}
                    className={styles.input}
                    type="text"
                    placeholder="Enter a product code"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRedeem();
                    }}
                  />
                  <div className={styles.btt_redeem} onClick={handleRedeem}>
                    Redeem
                  </div>
                </div>
                {warning && (
                  <p
                    style={{
                      fontWeight: 500,
                      color: "#FF5A5A",
                      marginTop: 10,
                      marginLeft: 5,
                      fontSize: 14,
                    }}
                  >
                    {warning}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {showingConfirmation && (
          <ConfirmRedeemModal
            setShowingConfirmation={setShowingConfirmation}
            expiration={accountInfo.expiration?.slice(0, 10)}
          />
        )}
      </div>
    </div>
  );
};

const MockupSplash = () => {
  return (
    <div className={styles.mockup_container}>
      <img
        src={delegations}
        alt="Delegations UI Image"
        className={styles.mockup}
        style={{ position: "absolute", top: "100px", left: "800px" }}
      />
      <img
        src={form}
        alt="Form UI Image"
        className={styles.mockup}
        style={{
          position: "absolute",
          top: "50px",
          left: "400px",
          zIndex: "1",
        }}
      />
      <img
        src={history}
        alt="History UI Image"
        className={styles.mockup}
        style={{ position: "absolute", top: "250px", left: "350px" }}
      />
      <img
        src={statistics}
        alt="Statistics UI Image"
        className={styles.mockup}
        style={{ position: "absolute", top: "120px", left: "200px" }}
      />
      <img
        src={notes}
        alt="Notes UI Image"
        className={styles.mockup}
        style={{ position: "absolute", top: "250px", left: "700px" }}
      />
    </div>
  );
};

export default Plan;
