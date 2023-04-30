import React from "react";
import { BsFillInboxFill, BsSendExclamationFill } from "react-icons/bs";
import { FaHandPointer } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import GradientAnimation from "../home/gradient/GradientAnimation";
import styles from "./Prepayment.module.css";

const Prepayment = () => {
  return (
    <div className={styles.container}>
      <GradientAnimation className={styles.gradient} />

      <div className={styles.messagebox}>
        <h2 className={styles.heading}>Payment Instructions</h2>
        <div className={styles.pairs}>
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
                <a href="mailto:info@munsuite.com" className={styles.email}>
                  info@munsuite.com
                </a>
              </p>
            }
          />
        </div>
        <a
          href="https://buy.stripe.com/bIY8z09RUfnPg0MeUU"
          target="_blank"
          className={styles.btt_full}
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

const IconTextPair = ({ icon, text }) => {
  return (
    <div className={styles.pair}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default Prepayment;
