import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.scoped.css";

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
import HomeTop from "./top/HomeTop";
import TrustedBy from "./trusted_by/TrustedBy";

function Home() {
  const { user, isPortrait } = useContext(appContext);

  return (
    <div className="home-container">
      <HomeTop />
      <TrustedBy />

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
