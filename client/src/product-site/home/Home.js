import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.scoped.css";

import formTab from "./images/mockups/form-tab.png";
import inboxTab from "./images/mockups/inbox-tab.png";

import delside from "./images/mockups/delside.png";
import delegations from "./images/mockups/delegations.png";
import form from "./images/mockups/form.png";
import inbox from "./images/mockups/inbox.png";
import history from "./images/mockups/history.png";
import statistics from "./images/mockups/statistics.png";
import notes from "./images/mockups/notes.png";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { ImFontSize, ImSearch } from "react-icons/im";
import { FaHistory } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import FeatureItem from "./FeatureItem";
import { siteContext } from "../../Context";
import GradientAnimation from "./gradient/GradientAnimation";

function Home() {
  const { isPortrait } = useContext(siteContext);

  const adwords = [
    "Simplified",
    "Modernized",
    "Streamlined",
    "Innovated",
    "Reimagined",
  ];
  const [adwordIndex, setAdwordIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAdwordIndex(adwordIndex == adwords.length - 1 ? 0 : adwordIndex + 1);
    }, 3000);
  }, [adwordIndex]);

  return (
    <div className="home-container">
      {/*Top Section*/}
      <div className="home-top">
        <GradientAnimation className="top-gradient" />
        <div className="home-top-container">
          <div className="top-left">
            <img
              src={inboxTab}
              alt="Inbox Page Preview"
              className="mockup-inbox"
            />
            <img
              src={formTab}
              alt="Form Page Preview"
              className="mockup-form"
            />
          </div>
          <div className="top-right">
            <p className="top-heading">
              MUN
              <br />
              Directives,
              <br />
              <p className="adword">{adwords[adwordIndex]}.</p>
            </p>
            <p className="top-subheading">
              The 21st century solution to directive chaos
            </p>
            {isPortrait ? (
              <div className="btt-get-started">Available on Desktop</div>
            ) : (
              <Link to="/options" className="btt-get-started">
                Get started
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="trusted-container">
        <div className="trusted-logos">
          <img
            src={require("./images/logos/horizons.png")}
            className="trusted-logo"
          />
          <img
            src={require("./images/logos/cahsmun.png")}
            className="trusted-logo"
          />
          <img
            src={require("./images/logos/vmun.png")}
            className="trusted-logo"
          />
        </div>
      </div>

      {/*Features Section*/}
      <div className="home-features">
        <FeatureItem
          heading="Personalized Delegate Dashboards."
          subheading="Directive status communication, a submission history, and password
              gating."
          img={delside}
          textPosition="right"
          icon={<BsFillPersonLinesFill size={50} className="features-icon" />}
          mobile={isPortrait}
        />

        <FeatureItem
          heading="Directives you can actually read."
          subheading="And a form shutoff for when things get a little too crazy."
          img={inbox}
          textPosition="left"
          icon={<ImFontSize size={50} className="features-icon" />}
          mobile={isPortrait}
        />

        <FeatureItem
          heading="A Directives History Page."
          subheading="This time when you leave your desk, the whole pile won't just
          disappear."
          img={history}
          textPosition="right"
          icon={<FaHistory size={50} className="features-icon" />}
          mobile={isPortrait}
        />

        <FeatureItem
          heading="Auto-collected Delegate Statistics."
          subheading="Automatically curated, to show who's putting money where their
          mouth is."
          img={statistics}
          textPosition="left"
          icon={<GoGraph size={50} className="features-icon" />}
          mobile={isPortrait}
        />

        <FeatureItem
          heading="Searchable Notes for Every Delegate."
          subheading="Evaluate and compare delegates with a dedicated UI. No more
          scribbled papers."
          img={notes}
          textPosition="right"
          icon={<ImSearch size={50} className="features-icon" />}
          mobile={isPortrait}
        />
      </div>

      {/*Let's Modernize Model UN.*/}
      <div className="home-modernize">
        <img
          src={delegations}
          alt="Delegations UI Image"
          className="modernize-image"
          style={{ position: "absolute", top: "-70px", left: "200px" }}
        />
        <img
          src={form}
          alt="Form UI Image"
          className="modernize-image"
          style={{ position: "absolute", bottom: "-50px", left: "0px" }}
        />
        <img
          src={history}
          alt="History UI Image"
          className="modernize-image"
          style={{ position: "absolute", bottom: "-100px", right: "200px" }}
        />
        <img
          src={statistics}
          alt="Statistics UI Image"
          className="modernize-image"
          style={{ position: "absolute", top: "-120px", left: "-20px" }}
        />
        <img
          src={notes}
          alt="Notes UI Image"
          className="modernize-image"
          style={{ position: "absolute", bottom: "0px", right: "-100px" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p className="modernize-header">Let's Modernize Model UN.</p>
          <Link to="/options" className="btt-see-options">
            See Options
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
