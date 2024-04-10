import "./HomeTop.scoped.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { appContext } from "../../../common/Context";
import GradientAnimation from "../../../common/components/gradient/GradientAnimation";
import Button from "../../../common/components/input/Button";
import formTab from "../../../common/assets/images/mockups/form_tab.png";
import inboxTab from "../../../common/assets/images/mockups/inbox_tab.png";
import { ADWORDS } from "../homeData";

const HomeTop = () => {
  const navigate = useNavigate();
  const { isPortrait, user } = useContext(appContext);
  const [adwordIndex, setAdwordIndex] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      setAdwordIndex((curr) => (curr == ADWORDS.length - 1 ? 0 : curr + 1));
    }, 3000);
  }, []);

  return (
    <div className="container">
      <GradientAnimation className="gradient" />

      <div className="content">
        <div className="mockups">
          <img
            src={inboxTab}
            alt="Inbox Page Preview"
            className="mockup_inbox"
          />
          <img src={formTab} alt="Form Page Preview" className="mockup_form" />
        </div>

        <div className="text">
          <p className="heading">
            <span>MUN</span>
            <span>Directives,</span>
            <span className="adword">{ADWORDS[adwordIndex]}.</span>
          </p>

          <p className="subheading">
            The 21st century solution to directive chaos
          </p>

          <Button
            onClick={() => {
              if (!isPortrait)
                navigate(user ? `/app/${user.uid}` : "/register");
            }}
            type="light"
            size="lg"
            padding={isPortrait ? "lg" : "md"}
          >
            {isPortrait
              ? "Available on Desktop"
              : user
              ? "Launch App"
              : "Try MUNSuite Free"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeTop;
