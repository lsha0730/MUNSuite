import React from "react";
import { Link } from "react-router-dom";
import "./Register.scoped.css";

function Register() {
    return (
        <div className="register-container">
            <p className="form-header">Register an Account</p>
            <div className="form">
                <div className="form-left">
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <p className="input-label">First Name</p>
                        <input type="text" className="input-field"></input>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <p className="input-label">Last Name</p>
                        <input type="text" className="input-field"></input>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <p className="input-label">Email</p>
                        <input type="text" className="input-field"></input>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <p className="input-label">Password</p>
                        <input type="password" className="input-field"></input>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <p className="input-label">Confirm Password</p>
                        <input type="password" className="input-field"></input>
                    </div>

                    <p className="additional-text" style={{marginTop:"50px", marginBottom:"10px"}}>Have an account?&nbsp;
                        <Link to="/login" className="additional-link">Log In.</Link>
                    </p>
                    <div className="btt-register">Register</div>
                </div>

                <div className="form-right">
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <p className="input-label">Conference Name</p>
                        <input type="text" className="input-field"></input>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <p className="input-label">Abbreviated Conference Name</p>
                        <input type="text" className="input-field"></input>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <p className="input-label">Access Code</p>
                        <input type="text" className="input-field"></input>
                    </div>
                    <p className="additional-text" style={{marginTop:"10px"}}>Don't have one?&nbsp;
                        <Link to="/options" className="additional-link">Get one!</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register;