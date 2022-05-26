import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./Register.scoped.css";
import { getDatabase, set, ref } from "firebase/database";

function Register() {
    const database = getDatabase();
    const auth = getAuth();
    const [warning, setWarning] = useState('');

    return (
        <div className="centering-container">
            <div className="register-container">
                <p className="form-header">Register an Account</p>
                <div className="form">
                    <div className="form-left">
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p className="input-label">Email</p>
                            <input type="text" id="email" className="input-field" onKeyDown={(e) => {if (e.key === 'Enter') handleRegister()}}></input>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p className="input-label">Password</p>
                            <input type="password" id="password" className="input-field" onKeyDown={(e) => {if (e.key === 'Enter') handleRegister()}}></input>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p className="input-label">Confirm Password</p>
                            <input type="password" id="confirm-password" className="input-field" onKeyDown={(e) => {if (e.key === 'Enter') handleRegister()}}></input>
                        </div>

                        <p className="additional-text" style={{marginTop:"50px", marginBottom:"10px"}}>Have an account?&nbsp;
                            <Link to="/login" className="additional-link">Log In.</Link>
                        </p>
                        <div className="btt-container">
                            <div className="btt-register" onClick={handleRegister}>Register</div>
                            <p className={warning!==""? "warning":"warning fade"}>{warning}</p>
                        </div>
                    </div>

                    <div className="form-right">
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p className="input-label">Abbreviated Conference Name</p>
                            <input type="text" id="abbreviated-conference-name" className="input-field" onKeyDown={(e) => {if (e.key === 'Enter') handleRegister()}}></input>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p className="input-label">Abbreviated Committee Name</p>
                            <input type="text" id="abbreviated-committee-name" className="input-field" onKeyDown={(e) => {if (e.key === 'Enter') handleRegister()}}></input>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p className="input-label">Product Code</p>
                            <input type="text" id="product-code" className="input-field" onKeyDown={(e) => {if (e.key === 'Enter') handleRegister()}}></input>
                        </div>
                        <p className="additional-text" style={{marginTop:"10px"}}>Don't have one?&nbsp;
                            <Link to="/options" className="additional-link">Get one!</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

    function handleRegister() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirm-password").value;
        let confName = document.getElementById("abbreviated-conference-name").value;
        let commName = document.getElementById("abbreviated-committee-name").value;
        let productCode = document.getElementById("product-code").value;
        let incomplete = [email, password, confirmPassword, confName, commName, productCode].some(e => e=="");

        if (incomplete) {
            setWarning("Fields Incomplete")
            setTimeout(() => setWarning(""), 1000);
        } else if (!validateEmail(email)) {
            setWarning("Invalid Email")
            setTimeout(() => setWarning(""), 1000);
        } else if (password.length < 8) {
            setWarning("Password must be 8 or more characters")
            setTimeout(() => setWarning(""), 1000);
        } else if (password !== confirmPassword) {
            setWarning("Passwords do not match")
            setTimeout(() => setWarning(""), 1000);
        } else if (!productCodeValid(productCode)) {
            setWarning("Invalid Product Code")
            setTimeout(() => setWarning(""), 1000);
        } else {
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                // Registered successfully
                set(ref(database, `appdata/${userCredential.user.uid}/livedata/settings`), {
                    committee: commName,
                    conference: confName
                });
            })
                .catch((error) => {
                    console.log(`Registration error (${error.code}): ${error.message}`)
            });
        }
    }

    function validateEmail(email) {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    }

    function productCodeValid(entry) {
        return [
            'Hs92aNWfB60zXLt',
            'm2yahTF55U1PXrg',
            'hhFijMJ8bQekzBY',
            'JNwaPWyXwKKJ6xp',
            'Jpwdxkj2xUB3ePw',
            'EOup9oGnNxIGuFj',
            'OMWUjx7dh4v6AK7',
            '1D0ki07NwUixKsA',
            'jbYwCdJi4xCgqrL',
            'zjDG2d4v2aLH1Z4',
            'LXJ37jtBe7Eoyoc',
            'BzeW2tiewiVeLvJ',
            'o1CJcMDhon73n1i',
            'yXshgSKtRUQfu5i',
            'jyWtCtpWAOeUAJD',
            'yvTxXkCPmFwPht9',
            'dqYgMvQHy5bBkv2',
            'cD0LRf70xcsQNrP',
            'uSqwEYilzk4IOon',
            'XmAWvGCv67WApXh',
            'pBguL8JFuleBVwJ',
            'NQsWNoB1Jjr5vQB',
            '3ELcXEra9Oaip9w',
            'CGXX9mktS7MCzXh',
            'zgSWb2h5cs08s7V',
            'jfBdvJ3bfH9U1qO',
            'm1yoeA6YXZdyeru',
            'QEmm9bsNq5Xv62j',
            'E1dpgHPNpYTa0EO',
            'PMyuvIULAY8z0Tq' ].includes(entry)
    }
}

export default Register;