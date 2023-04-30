import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import styles from "./Forgot.module.css";
import { BiPaperPlane } from "react-icons/bi";

function Forgot() {
  const auth = getAuth();
  const [warning, setWarning] = useState("");
  const [emailSent, setEmailSent] = useState(true);

  return (
    <div className={styles.centering_container}>
      {emailSent ? (
        <div className={styles.forgot_container}>
          <BiPaperPlane size={100} className={styles.icon} />
          <p className={styles.form_header}>Email Sent!</p>
          <p className={styles.form_subheader}>Check your inbox</p>
        </div>
      ) : (
        <div className={styles.forgot_container}>
          <p className={styles.form_header}>Reset Password</p>

          <p className={styles.input_label}>Account Email</p>
          <input
            type="text"
            id="email"
            className={styles.input_field}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleForgot();
            }}
          />

          <div className={styles.btt_container}>
            <div className={styles.btt_send} onClick={handleForgot}>
              Send Email
            </div>
            <p className={warning !== "" ? "warning" : "warning fade"}>
              {warning}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  function handleForgot() {
    let email = document.getElementById("email").value;
    let incomplete = [email].some((e) => e == "");

    if (incomplete) {
      setWarning("Field incomplete");
      setTimeout(() => setWarning(""), 1000);
    } else if (!validateEmail(email)) {
      setWarning("Invalid email");
      setTimeout(() => setWarning(""), 1000);
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setEmailSent(true);
        })
        .catch((error) => {
          console.log(`Login error (${error.code}): ${error.message}`);
          if (error.code == "auth/user-not-found") {
            setWarning("No user found");
            setTimeout(() => setWarning(""), 1000);
          }
        });
    }
  }

  function validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
}

export default Forgot;
