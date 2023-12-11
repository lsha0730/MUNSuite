import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.scoped.css";

import formTab from "../../common/assets/images/mockups/form_tab.png";
import inboxTab from "../../common/assets/images/mockups/inbox_tab.png";
import delside from "../../common/assets/images/mockups/delside.png";
import delegations from "../../common/assets/images/mockups/delegations.png";
import form from "../../common/assets/images/mockups/form.png";
import inbox from "../../common/assets/images/mockups/inbox.png";
import history from "../../common/assets/images/mockups/history.png";
import statistics from "../../common/assets/images/mockups/statistics.png";
import notes from "../../common/assets/images/mockups/notes.png";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { ImFontSize, ImSearch } from "react-icons/im";
import { FaHistory } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import FeatureItem from "./feature_item/FeatureItem";
import { appContext } from "../../common/Context";
import GradientAnimation from "../../common/components/gradient/GradientAnimation";
import Hoverable from "../../common/components/hover/Hover";

const TRUSTING_CONFS = [
  {
    name: "Horizons",
    img: require("../../common/assets/images/customer_logos/horizons.png"),
    url: "https://horizons.cahsmun.org",
  },
  {
    name: "CAHSMUN",
    img: require("../../common/assets/images/customer_logos/cahsmun.png"),
    url: "https://cahsmun.org",
  },
  {
    name: "VMUN",
    img: require("../../common/assets/images/customer_logos/vmun.png"),
    url: "https://vmun.com",
  },
  {
    name: "TMUN",
    img: require("../../common/assets/images/customer_logos/tmun.png"),
    url: "https://tmun.ca",
  },
];

function Home() {
  const { user, isPortrait } = useContext(appContext);

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
              <span className="adword">{adwords[adwordIndex]}.</span>
            </p>
            <p className="top-subheading">
              The 21st century solution to directive chaos
            </p>
            {isPortrait ? (
              <div className="btt-try-free">Available on Desktop</div>
            ) : user ? (
              <Link to={`/app/${user.uid}`} className="btt-try-free">
                Launch App
              </Link>
            ) : (
              <Link to="/register" className="btt-try-free">
                Try MUNSuite Free
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="trusted-container">
        <div className="trusted-logos">
          {TRUSTING_CONFS.map((conf) => (
            <Hoverable
              message={conf.name}
              href={conf.url}
              messageStyle={{ width: 75, textAlign: "center", padding: 0 }}
              pos={{ bottom: -20 }}
            >
              <img src={conf.img} className="trusted-logo" />
            </Hoverable>
          ))}
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
          {user ? (
            <Link to={`/app/${user.uid}`} className="btt-see-options">
              Launch App
            </Link>
          ) : (
            <Link to="/register" className="btt-see-options">
              Try MUNSuite Free
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
