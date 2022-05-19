import React from "react";
import { Link } from "react-router-dom";
import "../register/Register.scoped.css";

function Login() {
    return (
        <div className="centering-container">
            <div className="register-container">
                <p className="form-header">Log In</p>
                <div className="form">
                    <div className="form-left">
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p className="input-label">Email</p>
                            <input type="text" className="input-field"></input>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p className="input-label">Password</p>
                            <input type="password" className="input-field"></input>
                        </div>
                        <p className="additional-text" style={{marginTop:"10px"}}>
                            <Link to="/forgot" className="additional-link">Forgot Password?</Link>
                        </p>

                        <p className="additional-text" style={{marginTop:"100px", marginBottom:"10px"}}>Don't have an account?&nbsp;
                            <Link to="/register" className="additional-link">Register!</Link>
                        </p>
                        <div className="btt-register">Log In</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;