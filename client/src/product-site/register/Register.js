import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from "./Register.module.css";
import axios from "axios";

function Register() {
  const auth = getAuth();
  const [warning, setWarning] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const confNameRef = useRef();
  const commNameRef = useRef();
  const eulaRef = useRef();
  const navigate = useNavigate();

  return (
    <div className={styles.centering_container}>
      <div className={styles.register_container}>
        <p className={styles.form_header}>Register an Account</p>
        <div className={styles.form}>
          <div className={styles.form_left}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className={styles.input_label}>Email</p>
              <input
                ref={emailRef}
                type="text"
                className={styles.input_field}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className={styles.input_label}>Password</p>
              <input
                ref={passwordRef}
                type="password"
                className={styles.input_field}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className={styles.input_label}>Confirm Password</p>
              <input
                ref={confirmPassRef}
                type="password"
                className={styles.input_field}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
              />
            </div>

            <p
              className={styles.additional_text}
              style={{ marginTop: "50px", marginBottom: "10px" }}
            >
              Have an account?&nbsp;
              <Link to="/login" className={styles.additional_link}>
                Log In.
              </Link>
            </p>
            <div className={styles.btt_container}>
              <div className={styles.btt_register} onClick={handleRegister}>
                Register
              </div>
              <p className={warning !== "" ? "warning" : "warning fade"}>
                {warning}
              </p>
            </div>
          </div>

          <div className={styles.form_right}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className={styles.input_label}>Abbreviated Conference Name</p>
              <input
                ref={confNameRef}
                type="text"
                className={styles.input_field}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className={styles.input_label}>Abbreviated Committee Name</p>
              <input
                ref={commNameRef}
                type="text"
                className={styles.input_field}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
              />
            </div>
            <div className={styles.eula_container}>
              <p className={styles.input_label}>
                I have read and agree to the{" "}
                <Link className={styles.eula_link} to="/eula" target="_blank">
                  EULA
                </Link>
              </p>
              <input
                ref={eulaRef}
                className={styles.eula_check}
                type="checkbox"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function handleRegister() {
    const submission = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      confirmPassword: confirmPassRef.current?.value || "",
      confName: confNameRef.current?.value || "",
      commName: commNameRef.current?.value || "",
      eula: Boolean(eulaRef.current?.checked),
    };

    axios
      .post("https://munsuite-backend.onrender.com/register/newuser", {
        registrationObject: submission,
      })
      .then((response) => {
        const data = response.data;
        if (data == "Success") {
          signInWithEmailAndPassword(
            auth,
            submission.email,
            submission.password
          )
            .then(() => {
              navigate(`/app/${auth.currentUser.uid}`);
            })
            .catch((error) => {
              if (error.code == "auth/wrong-password") {
                setWarning("Wrong Password");
                setTimeout(() => setWarning(""), 1000);
              }
            });
        } else {
          setWarning(data);
          setTimeout(() => setWarning(""), 1000);
        }
      });
  }
}

export default Register;
