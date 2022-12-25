"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { db, auth } = require("../firebase.js");
const express = require("express");
const registerRouter = express.Router();
const { getUTCTimestamp } = require("../utils");
const defaultFormData = require("./defaultFormData.json");
// Read product codes from database
let validCodes = {};
let usedCodes = {};
const validRef = db.ref("adminData/accessCodes/valid");
const usedRef = db.ref("adminData/accessCodes/used");
validRef.once("value", (snapshot) => {
    validCodes = snapshot.val() || {};
    console.log(validCodes);
});
usedRef.once("value", (snapshot) => {
    usedCodes = snapshot.val() || {};
    console.log(usedCodes);
});
// Request handlers
registerRouter.post("/", (req, res) => {
    const submissionObject = req.body.submissionObject;
    const validation = validateRegister(submissionObject);
    if (validation == "Success") {
        makeAccount(submissionObject).then((result) => {
            res.send(result);
        });
    }
    else {
        res.send(validation);
    }
});
// Helper functions
const validateRegister = ({ email, password, confirmPassword, confName, commName, productCode, }) => {
    const complete = [
        email,
        password,
        confirmPassword,
        confName,
        commName,
        productCode,
    ].every((e) => (e || "") != "");
    const checks = [
        complete,
        validateEmail(email),
        password.length >= 8,
        password == confirmPassword,
        productCodeValid(productCode),
    ];
    const errors = [
        "Fields Incomplete",
        "Invalid Email",
        "Password must be 8 or more characters",
        "Passwords do not match",
        "Invalid product code",
    ];
    checks.forEach((check, index) => {
        if (!check) {
            return errors[index];
        }
    });
    return "Success";
};
const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
const makeAccount = ({ email, password, confName, commName, productCode, }) => {
    return new Promise((resolve) => {
        auth
            .createUser({
            email: email,
            password: password,
        })
            .then((userCredential) => {
            writeToUser(userCredential.uid, "settings", {
                committee: commName,
                conference: confName,
            });
            writeToUser(userCredential.uid, "form", defaultFormData);
            killProductCode(productCode);
            resolve("Success");
        })
            .catch((error) => {
            const message = `Registration error (${error.code}): ${error.message}`;
            console.log(message);
            resolve(message);
        });
    });
};
const productCodeValid = (productCode) => {
    return Boolean(validCodes[productCode]);
};
const killProductCode = (usedCode) => {
    const UTCTimestamp = getUTCTimestamp();
    // Remove used code from list of valids
    validRef.child(usedCode).set(null);
    // Log the code as claimed with timestamp
    usedRef.child(usedCode).set(UTCTimestamp);
};
const writeToUser = (uid, target, content) => {
    if ([
        "delegations",
        "form",
        "pendings",
        "processed",
        "notes",
        "settings",
    ].includes(target)) {
        const ref = db.ref(`appdata/${uid}/livedata/${target}`);
        ref.set(content);
    }
};
module.exports = { registerRouter };
