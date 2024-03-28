import { useState, useContext, useRef, useEffect } from "react";
import { appContext, staffContext } from "../../common/Context";
import "./Plan.scoped.css";
import axios from "axios";

import { RedeemConfirmation } from "../modals";
import { HiBadgeCheck } from "react-icons/hi";
import MockupSplash from "./mockup_splash/MockupSplash";
import { MAX_SUBMISSIONS } from "../../common/constants";
import TierCard from "../../product_site/plans/tier_card/TierCard";

const Plan = () => {
  const { user } = useContext(appContext);
  const {
    staffAPI: { accountInfo, setAccountInfo },
    firebaseData: { pendings, processed },
  } = useContext(staffContext);
  const totalSubmissions = pendings?.length + processed?.length;
  const codeRef = useRef();
  const [warning, setWarning] = useState("");
  const [showingConfirmation, setShowingConfirmation] = useState(false);

  const handleRedeem = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/account/redeem`, {
        code: codeRef?.current?.value,
        uid: user.uid,
      })
      .then((response) => {
        const data = response.data;
        if (data === "Success") {
          // Check account status again
          axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/account/info`, {
              uid: user.uid,
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
      .post(`${process.env.REACT_APP_BACKEND_URL}/account/info`, {
        uid: user?.uid || "",
      })
      .then((response) => {
        const data = response.data;
        setAccountInfo(data);
      });
  }, []);

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
                {`To continue after ${MAX_SUBMISSIONS} submissions, please clear your account data
                or upgrade to a premium plan.`}
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
              Expiration:&nbsp;
              <p style={{ color: "#707070" }}>{`${accountInfo.expiration?.slice(
                0,
                10
              )}`}</p>
            </p>
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
                marginTop: "2rem",
                marginBottom: "1rem",
                gap: "3rem",
              }}
            >
              <TierCard tier="starter" />
              <TierCard tier="premium" />
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
                    ref={codeRef}
                    className="input"
                    type="text"
                    placeholder="Enter a product code"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRedeem();
                    }}
                  />
                  <div className="btt-redeem" onClick={handleRedeem}>
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
          <RedeemConfirmation
            setShowingConfirmation={setShowingConfirmation}
            expiration={accountInfo.expiration?.slice(0, 10)}
          />
        )}
      </div>
    </div>
  );
};

export default Plan;
