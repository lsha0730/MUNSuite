import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scoped.css";

import FeatureItem from "./feature_item/FeatureItem";
import { appContext } from "../../common/Context";
import HomeTop from "./top/HomeTop";
import Button from "../../common/components/input/Button";
import Hoverable from "../../common/components/hover/Hover";
import { FEATURES, IMAGES, TRUSTING_CONFS } from "./homeData";

const Home = () => {
  const navigate = useNavigate();
  const { user, isPortrait } = useContext(appContext);

  return (
    <div className="home-container">
      <HomeTop />

      <div className="trusted_by">
        {TRUSTING_CONFS.map((conf) => (
          <Hoverable
            message={conf.name}
            href={conf.url}
            messageStyle={{ width: 75, textAlign: "center", padding: 0 }}
            pos={{ bottom: -20 }}
            style={{ width: "fit-content", height: "fit-content" }}
          >
            <img src={conf.img} className="logo" />
          </Hoverable>
        ))}
      </div>

      <div className="features">
        {FEATURES.map((f, i) => (
          <FeatureItem {...f} textPosition={i % 2 == 0 ? "right" : "left"} />
        ))}
      </div>

      <div className="lets-modernize">
        {IMAGES.map((i) => (
          <img
            className="modernize-image"
            src={i.img}
            alt={i.alt}
            style={i.style}
          />
        ))}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p className="modernize-header">Let's Modernize Model UN.</p>
          {!isPortrait && (
            <Button
              onClick={() => {
                navigate(user ? `/app/${user.uid}` : "/register");
              }}
              type="white"
              size="lg"
            >
              {user ? "Launch App" : "Try MUNSuite Free"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
