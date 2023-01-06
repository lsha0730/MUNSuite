import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./Register.scoped.css";
import axios from "axios";

function Register() {
  const auth = getAuth();
  const [warning, setWarning] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const confNameRef = useRef();
  const commNameRef = useRef();
  const navigate = useNavigate();

  return (
    <div className="centering-container">
      <div className="register-container">
        <p className="form-header">Register an Account</p>
        <div className="form">
          <div className="form-left">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="input-label">Email</p>
              <input
                ref={emailRef}
                type="text"
                className="input-field"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="input-label">Password</p>
              <input
                ref={passwordRef}
                type="password"
                className="input-field"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="input-label">Confirm Password</p>
              <input
                ref={confirmPassRef}
                type="password"
                className="input-field"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
              />
            </div>

            <p
              className="additional-text"
              style={{ marginTop: "50px", marginBottom: "10px" }}
            >
              Have an account?&nbsp;
              <Link to="/login" className="additional-link">
                Log In.
              </Link>
            </p>
            <div className="btt-container">
              <div className="btt-register" onClick={handleRegister}>
                Register
              </div>
              <p className={warning !== "" ? "warning" : "warning fade"}>
                {warning}
              </p>
            </div>
          </div>

          <div className="form-right">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="input-label">Abbreviated Conference Name</p>
              <input
                ref={confNameRef}
                type="text"
                className="input-field"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="input-label">Abbreviated Committee Name</p>
              <input
                ref={commNameRef}
                type="text"
                className="input-field"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
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
