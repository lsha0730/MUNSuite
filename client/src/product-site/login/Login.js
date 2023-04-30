import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from "../register/Register.module.css";

function Login() {
  const auth = getAuth();
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();

  return (
    <div className={styles.centering_container}>
      <div className={styles.register_container}>
        <p className={styles.form_header}>Log In</p>
        <div className={styles.form}>
          <div className={styles.form_left}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className={styles.input_label}>Email</p>
              <input
                type="text"
                id="email"
                className={styles.input_field}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className={styles.input_label}>Password</p>
              <input
                type="password"
                id="password"
                className={styles.input_field}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
              />
            </div>
            <p className={styles.additional_text} style={{ marginTop: "10px" }}>
              <Link to="/forgot" className={styles.additional_link}>
                Forgot Password?
              </Link>
            </p>

            <p
              className={styles.additional_text}
              style={{ marginTop: "100px", marginBottom: "10px" }}
            >
              Don't have an account?&nbsp;
              <Link to="/register" className={styles.additional_link}>
                Register!
              </Link>
            </p>

            <div className={styles.btt_container}>
              <div className={styles.btt_register} onClick={handleLogin}>
                Log In
              </div>
              <p className={warning !== "" ? "warning" : "warning fade"}>
                {warning}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function handleLogin() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let incomplete = [email, password].some((e) => e == "");

    if (incomplete) {
      setWarning("Fields Incomplete");
      setTimeout(() => setWarning(""), 1000);
    } else if (!validateEmail(email)) {
      setWarning("Invalid Email");
      setTimeout(() => setWarning(""), 1000);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate(`/app/${auth.currentUser.uid}`);
        })
        .catch((error) => {
          console.log(`Login error (${error.code}): ${error.message}`);
          if (error.code == "auth/wrong-password") {
            setWarning("Wrong Password");
            setTimeout(() => setWarning(""), 1000);
          }
        });
    }
  }

  function validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
}

export default Login;
