import React, { useContext, useEffect, useState } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import "./Dashboard.scoped.css";
import { siteContext } from "../../Context";

import delegations from "../home/images/delegations.png";
import form from "../home/images/form.png";
import history from "../home/images/history.png";
import statistics from "../home/images/statistics.png";
import notes from "../home/images/notes.png";
import { Link } from "react-router-dom";

function Dashboard() {
  const { currentUser } = useContext(siteContext);
  const [settings, setSettings] = useState({});
  const database = getDatabase();

  // Firebase: Reading Settings
  useEffect(() => {
    onValue(
      ref(database, `appdata/${currentUser}/livedata/settings`),
      (snapshot) => {
        let node = snapshot.val();
        if (!node) {
          console.log("Overwrote");
          setSettings({ conference: "MUNSuite", committee: "Committee" });
        } else {
          setSettings(node);
        }
      }
    );
  }, []);

  return (
    <div className="centering-container">
      <div className="dashboard-container">
        <p className="form-heading">
          Welcome {settings.conference} {settings.committee}!
        </p>
        <p className="form-subheading">
          Account Type:&nbsp;<p style={{ color: "#00A3FF" }}>Premium</p>
        </p>

        <Link className="btt-launch-app" to={`/app/${currentUser}`}>
          Launch App
        </Link>

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
              top: "0px",
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
            style={{ position: "absolute", top: "300px", left: "900px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
