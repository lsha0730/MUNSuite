import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import "../register/Register.scoped.css";
import { siteContext } from "../../Context";
import defaultFormData from "../register/defaultFormData";

function Login() {
    const {app} = useContext(siteContext);
    const database = getDatabase(app);
    const {currentUser} = useContext(siteContext);
    const auth = getAuth();
    const [warning, setWarning] = useState("");

    return (
        <div className="centering-container">
            <div className="register-container">
                <p className="form-header">Log In</p>
                <div className="form">
                    <div className="form-left">
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p className="input-label">Email</p>
                            <input type="text" id="email" className="input-field" onKeyDown={(e) => {if (e.key === 'Enter') handleLogin()}}></input>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p className="input-label">Password</p>
                            <input type="password" id="password" className="input-field" onKeyDown={(e) => {if (e.key === 'Enter') handleLogin()}}></input>
                        </div>
                        <p className="additional-text" style={{marginTop:"10px"}}>
                            <Link to="/forgot" className="additional-link">Forgot Password?</Link>
                        </p>

                        <p className="additional-text" style={{marginTop:"100px", marginBottom:"10px"}}>Don't have an account?&nbsp;
                            <Link to="/register" className="additional-link">Register!</Link>
                        </p>

                        <div className="btt-container">
                            <div className="btt-register" onClick={handleLogin}>Log In</div>
                            <p className={warning!==""? "warning":"warning fade"}>{warning}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    function handleLogin() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let incomplete = [email, password].some(e => e=="");

        if (incomplete) {
            setWarning("Fields Incomplete")
            setTimeout(() => setWarning(""), 1000);
        } else if (!validateEmail(email)) {
            setWarning("Invalid Email")
            setTimeout(() => setWarning(""), 1000);
        } else {
            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                // Signed in successfully.

                // Clear account data if demo account
                if (userCredential.user.uid == "Y458AEs1X0MUcqcTduJwBq1WDOh2") {
                    writeToFirebase(userCredential.user.uid, "delegations", []);
                    writeToFirebase(userCredential.user.uid, "form", defaultFormData);
                    writeToFirebase(userCredential.user.uid, "pendings", []);
                    writeToFirebase(userCredential.user.uid, "processed", []);
                    writeToFirebase(userCredential.user.uid, "notes", { individual: [], quick: "" });
                    writeToFirebase(userCredential.user.uid, "settings", { conference: "Demo", committee: "Account" });
                }
            }).catch((error) => {
                console.log(`Login error (${error.code}): ${error.message}`)
                if (error.code == "auth/wrong-password") {
                    setWarning("Wrong Password")
                    setTimeout(() => setWarning(""), 1000);
                }
            });
        }
    }

    // Firebase: Writing
    function writeToFirebase(uid, target, content) {
        if (["delegations", "form", "pendings", "processed", "notes", "settings"].includes(target)) {
        set(ref(database, `appdata/${uid}/livedata/${target}`), content);
        }
    }

    function validateEmail(email) {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    }
}

export default Login;