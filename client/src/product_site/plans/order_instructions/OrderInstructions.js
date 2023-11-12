import React from "react";
import { BsFillInboxFill, BsSendExclamationFill } from "react-icons/bs";
import { FaHandPointer } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import GradientAnimation from "../../home/gradient/GradientAnimation";
import "./OrderInstructions.scoped.css";

const OrderInstructions = () => {
  return (
    <div className="container">
      <GradientAnimation className="gradient" />

      <div className="messagebox">
        <h2 className="heading">Payment Instructions</h2>
        <div className="pairs">
          <IconTextPair
            icon={<FaHandPointer fill="#00a3ff" size={25} />}
            text="In the payment page below, select the appropriate quantity of codes
            to purchase"
          />
          <IconTextPair
            icon={<MdAlternateEmail fill="#00a3ff" size={25} />}
            text="Pay with the email address you'd like to receive your codes at"
          />
          <IconTextPair
            icon={<BsFillInboxFill fill="#00a3ff" size={25} />}
            text="After payment, allow up to 5 minutes for an email with your codes.
            Check your spam and promotion folders."
          />
          <IconTextPair
            icon={<BsSendExclamationFill fill="#00a3ff" size={25} />}
            text={
              <p>
                If you encounter any problems, shoot us an email at{" "}
                <a href="mailto:info@munsuite.com" className="email">
                  info@munsuite.com
                </a>
              </p>
            }
          />
        </div>
        <a
          href="https://buy.stripe.com/bIY8z09RUfnPg0MeUU"
          target="_blank"
          className="btt-full"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

const IconTextPair = ({ icon, text }) => {
  return (
    <div className="pair">
      <div className="icon">{icon}</div>
      <div className="text">{text}</div>
    </div>
  );
};

export default OrderInstructions;
