import "./OrderInstructions.scoped.css";
import { BsFillInboxFill, BsSendExclamationFill } from "react-icons/bs";
import { FaHandPointer } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import GradientAnimation from "../../../common/components/gradient/GradientAnimation";
import IconTextPair from "../../../common/components/misc/IconTextPair";
import { STRIPE_PURCHASE_LINK } from "../../../common/constants";
import Button from "../../../common/components/input/Button";

const BULLET_POINTS = [
  {
    icon: <FaHandPointer fill="#00a3ff" size={25} />,
    text:
      "In the payment page below, select the appropriate quantity of codes to purchase",
  },
  {
    icon: <MdAlternateEmail fill="#00a3ff" size={25} />,
    text:
      "Pay with the email address you'd like to receive your codes and purchase receipt at",
  },
  {
    icon: <BsFillInboxFill fill="#00a3ff" size={25} />,
    text:
      "After payment, allow up to 5 minutes for an email with your codes. Check your spam and promotion folders.",
  },
  {
    icon: <BsSendExclamationFill fill="#00a3ff" size={25} />,
    text: (
      <p>
        If you encounter any problems, shoot us an email at{" "}
        <a href="mailto:info@munsuite.com" className="email">
          info@munsuite.com
        </a>
      </p>
    ),
  },
];

const OrderInstructions = () => {
  return (
    <div className="container">
      <GradientAnimation className="gradient" />

      <div className="messagebox">
        <h2 className="heading">Payment Instructions</h2>
        <div className="pairs">
          {BULLET_POINTS.map((bp) => (
            <IconTextPair {...bp} />
          ))}
        </div>

        <Button
          onClick={() => {
            window.open(STRIPE_PURCHASE_LINK, "_blank");
          }}
          type="light"
          fullWidth
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default OrderInstructions;
