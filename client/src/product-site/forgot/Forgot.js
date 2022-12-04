import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "./Forgot.scoped.css";
import { MdMarkEmailRead } from "react-icons/md";

function Forgot() {
  const auth = getAuth();
  const [warning, setWarning] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  return (
    <div className="centering-container">
      {emailSent ? (
        <div className="forgot-container">
          <MdMarkEmailRead size={100} className="icon" />
          <p className="form-header">Email Sent!</p>
          <p className="form-subheader">Check your inbox</p>
        </div>
      ) : (
        <div className="forgot-container">
          <p className="form-header">Reset Password</p>

          <p className="input-label">Account Email</p>
          <input
            type="text"
            id="email"
            className="input-field"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleForgot();
            }}
          ></input>

          <div className="btt-container">
            <div className="btt-send" onClick={handleForgot}>
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
