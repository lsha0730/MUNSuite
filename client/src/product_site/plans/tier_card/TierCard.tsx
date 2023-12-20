import "./TierCard.scoped.css";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import SingleFill from "../../../common/assets/icons/single_fill.svg";
import FlyingDark from "../../../common/assets/icons/flying_dark.svg";
import { BsCheck } from "react-icons/bs";
import { PREMIUM_FEATURES, STARTER_FEATURES } from "../../../common/constants";
import { classNames } from "../../../common/utils/utils";
import Button, { ButtonType } from "../../../common/components/input/Button";

type Props = {
  tier: "starter" | "premium";
};

type TierInfo = {
  icon: ReactNode;
  heading: string;
  subheading: string;
  price: string;
  price_subtext: string | null;
  features: string[];
  action: string;
  buttonType: ButtonType;
  onClick: () => void;
};
type TierDictionary = Record<string, TierInfo>;

const TierCard = ({ tier }: Props) => {
  const navigate = useNavigate();
  const tierCards: TierDictionary = {
    starter: {
      icon: (
        <img
          className="icon noselect"
          src={SingleFill}
          style={{ height: 40 }}
        />
      ),
      heading: "Starter",
      subheading: "For small conferences, school clubs, or student groups",
      price: "Free",
      price_subtext: null,
      features: STARTER_FEATURES,
      action: "Make an account",
      buttonType: "white_outlined",
      onClick: () => {
        navigate("/register");
      },
    },
    premium: {
      icon: (
        <img
          className="icon noselect"
          src={FlyingDark}
          style={{ height: 50 }}
        />
      ),
      heading: "Premium",
      subheading: "For bigger, more serious applications",
      price: "$10",
      price_subtext: "3 months access",
      features: PREMIUM_FEATURES,
      action: "Get Started",
      buttonType: "light",
      onClick: () => {
        navigate("/prepayment");
      },
    },
  };

  const {
    icon,
    heading,
    subheading,
    price,
    price_subtext,
    features,
    action,
    buttonType,
    onClick,
  } = tierCards[tier];

  return (
    <div className="card">
      <div className={classNames("tie", `tie_${tier}`)}>
        {icon}
        <p className={`heading_${tier}`}>{heading}</p>
        <p className={`subheading_${tier}`}>{subheading}</p>
      </div>

      <div className="body">
        <div className="flexcol">
          <h1 className="price">{price}</h1>
          {price_subtext && <p className="price_subtext">{price_subtext}</p>}
        </div>

        <div className="features">
          {features.map((e) => (
            <div className="feature">
              <BsCheck size={16} className="check" />
              <p className="feature_text">{e}</p>
            </div>
          ))}
        </div>

        <Button onClick={onClick} innerText={action} type={buttonType} full />
      </div>
    </div>
  );
};

export default TierCard;
