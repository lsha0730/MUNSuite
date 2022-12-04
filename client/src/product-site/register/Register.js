import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./Register.scoped.css";
import { getDatabase, set, ref, onValue } from "firebase/database";
import defaultFormData from "./defaultFormData.js";
import { siteContext } from "../../Context";

function Register() {
  const database = getDatabase();
  const auth = getAuth();
  const { currentUser } = useContext(siteContext);
  const [warning, setWarning] = useState("");

  // Temporary product code validation
  const [validCodes, setValidCodes] = useState([]);
  const [usedCodes, setUsedCodes] = useState([]);
  useEffect(() => {
    onValue(ref(database, `adminData/productCodes/valid`), (snapshot) => {
      // Check if the link is valid
      if (snapshot.exists()) {
        setValidCodes(snapshot.val());
      }
    });
    onValue(ref(database, `adminData/productCodes/used`), (snapshot) => {
      // Check if the link is valid
      if (snapshot.exists()) {
        setUsedCodes(snapshot.val());
      }
    });
  }, []);
  function productCodeValid(entry) {
    return validCodes.includes(entry);
  }
  function killProductCode(code) {
    let newValids = validCodes.filter((item) => item !== code);
    set(ref(database, `adminData/productCodes/valid`), newValids);

    let newUseds = usedCodes.concat(code);
    set(ref(database, `adminData/productCodes/used`), newUseds);
  }

  return (
    <div className="centering-container">
      <div className="register-container">
        <p className="form-header">Register an Account</p>
        <div className="form">
          <div className="form-left">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="input-label">Email</p>
              <input
                type="text"
                id="email"
                className="input-field"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
              ></input>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="input-label">Password</p>
              <input
                type="password"
                id="password"
                className="input-field"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
              ></input>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="input-label">Confirm Password</p>
              <input
                type="password"
                id="confirm-password"
                className="input-field"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
              ></input>
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
                type="text"
                id="abbreviated-conference-name"
                className="input-field"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
              ></input>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="input-label">Abbreviated Committee Name</p>
              <input
                type="text"
                id="abbreviated-committee-name"
                className="input-field"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
              ></input>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="input-label">Product Code</p>
              <input
                type="text"
                id="product-code"
                className="input-field"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
              ></input>
            </div>
            <p className="additional-text" style={{ marginTop: "10px" }}>
              Don't have one?&nbsp;
              <Link to="/options" className="additional-link">
                Get one!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  function handleRegister() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let confName = document.getElementById("abbreviated-conference-name").value;
    let commName = document.getElementById("abbreviated-committee-name").value;
    let productCode = document.getElementById("product-code").value;
    let incomplete = [
      email,
      password,
      confirmPassword,
      confName,
      commName,
      productCode,
    ].some((e) => e == "");

    if (incomplete) {
      setWarning("Fields Incomplete");
      setTimeout(() => setWarning(""), 1000);
    } else if (!validateEmail(email)) {
      setWarning("Invalid Email");
      setTimeout(() => setWarning(""), 1000);
    } else if (password.length < 8) {
      setWarning("Password must be 8 or more characters");
      setTimeout(() => setWarning(""), 1000);
    } else if (password !== confirmPassword) {
      setWarning("Passwords do not match");
      setTimeout(() => setWarning(""), 1000);
    } else if (!productCodeValid(productCode)) {
      setWarning("Invalid Product Code");
      setTimeout(() => setWarning(""), 1000);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(commName);
          console.log(confName);

          // Registered successfully
          writeToFirebase(userCredential.user.uid, "settings", {
            committee: commName,
            conference: confName,
          });
          writeToFirebase(userCredential.user.uid, "form", defaultFormData);

          killProductCode(productCode);
        })
        .catch((error) => {
          console.log(`Registration error (${error.code}): ${error.message}`);
        });
    }
  }

  function validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  // Firebase: Writing
  function writeToFirebase(uid, target, content) {
    if (
      [
        "delegations",
        "form",
        "pendings",
        "processed",
        "notes",
        "settings",
      ].includes(target)
    ) {
      set(ref(database, `appdata/${uid}/livedata/${target}`), content);
    }
  }
}

export default Register;
