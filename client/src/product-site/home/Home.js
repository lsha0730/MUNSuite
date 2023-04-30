import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

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
import Hoverable from "../../composable/hover/Hover";

function Home() {
  const { isPortrait, currentUser } = useContext(siteContext);

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
    <div className={styles.home_container}>
      {/*Top Section*/}
      <div className={styles.home_top}>
        <GradientAnimation className={styles.top_gradient} />
        <div className={styles.home_top_container}>
          <div className={styles.top_left}>
            <img
              src={inboxTab}
              alt="Inbox Page Preview"
              className={styles.mockup_inbox}
            />
            <img
              src={formTab}
              alt="Form Page Preview"
              className={styles.mockup_form}
            />
          </div>
          <div className={styles.top_right}>
            <p className={styles.top_heading}>
              MUN
              <br />
              Directives,
              <br />
              <span className={styles.adword}>{adwords[adwordIndex]}.</span>
            </p>
            <p className={styles.top_subheading}>
              The 21st century solution to directive chaos
            </p>
            {isPortrait ? (
              <div className={styles.btt_try_free}>Available on Desktop</div>
            ) : currentUser ? (
              <Link to={`/app/${currentUser}`} className={styles.btt_try_free}>
                Launch App
              </Link>
            ) : (
              <Link to="/register" className={styles.btt_try_free}>
                Try MUNSuite Free
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className={styles.trusted_container}>
        <div className={styles.trusted_logos}>
          <Hoverable message="Horizons" pos={{ bottom: -25, left: 3 }}>
            <img
              src={require("./images/logos/horizons.png")}
              className={styles.trusted_logo}
            />
          </Hoverable>
          <Hoverable message="CAHSMUN" pos={{ bottom: -25, left: -5 }}>
            <img
              src={require("./images/logos/cahsmun.png")}
              className={styles.trusted_logo}
            />
          </Hoverable>
          <Hoverable message="VMUN" pos={{ bottom: -25, left: 8 }}>
            <img
              src={require("./images/logos/vmun.png")}
              className={styles.trusted_logo}
            />
          </Hoverable>
          <Hoverable message="TMUN" pos={{ bottom: -25, left: 8 }}>
            <img
              src={require("./images/logos/tmun.png")}
              className={styles.trusted_logo}
            />
          </Hoverable>
        </div>
      </div>

      {/*Features Section*/}
      <div className={styles.home_features}>
        <FeatureItem
          heading="Personalized Delegate Dashboards."
          subheading="Directive status communication, a submission history, and password gating."
          img={delside}
          textPosition="right"
          icon={
            <BsFillPersonLinesFill size={50} className={styles.features_icon} />
          }
          mobile={isPortrait}
        />
        <FeatureItem
          heading="Directives you can actually read."
          subheading="And a form shutoff for when things get a little too crazy."
          img={inbox}
          textPosition="left"
          icon={<ImFontSize size={50} className={styles.features_icon} />}
          mobile={isPortrait}
        />

        <FeatureItem
          heading="A Directives History Page."
          subheading="This time when you leave your desk, the whole pile won't just disappear."
          img={history}
          textPosition="right"
          icon={<FaHistory size={50} className={styles.features_icon} />}
          mobile={isPortrait}
        />

        <FeatureItem
          heading="Auto-collected Delegate Statistics."
          subheading="Automatically curated, to show who's putting money where their mouth is."
          img={statistics}
          textPosition="left"
          icon={<GoGraph size={50} className={styles.features_icon} />}
          mobile={isPortrait}
        />

        <FeatureItem
          heading="Searchable Notes for Every Delegate."
          subheading="Evaluate and compare delegates with a dedicated UI. No more scribbled papers."
          img={notes}
          textPosition="right"
          icon={<ImSearch size={50} className={styles.features_icon} />}
          mobile={isPortrait}
        />
      </div>

      {/*Let's Modernize Model UN.*/}
      <div className={styles.home_modernize}>
        <img
          src={delegations}
          alt="Delegations UI Image"
          className={styles.modernize_image}
          style={{ position: "absolute", top: "-70px", left: "200px" }}
        />
        <img
          src={form}
          alt="Form UI Image"
          className={styles.modernize_image}
          style={{ position: "absolute", bottom: "-50px", left: "0px" }}
        />
        <img
          src={history}
          alt="History UI Image"
          className={styles.modernize_image}
          style={{ position: "absolute", bottom: "-100px", right: "200px" }}
        />
        <img
          src={statistics}
          alt="Statistics UI Image"
          className={styles.modernize_image}
          style={{ position: "absolute", top: "-120px", left: "-20px" }}
        />
        <img
          src={notes}
          alt="Notes UI Image"
          className={styles.modernize_image}
          style={{ position: "absolute", bottom: "0px", right: "-100px" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p className={styles.modernize_header}>Let's Modernize Model UN.</p>
          {currentUser ? (
            <Link to={`/app/${currentUser}`} className={styles.btt_see_options}>
              Launch App
            </Link>
          ) : (
            <Link to="/register" className={styles.btt_see_options}>
              Try MUNSuite Free
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
