const { db, auth } = require("../firebase");

import express = require("express");
const registerRouter = express.Router();
registerRouter.use(express.json());

import { CodesLog, RegistrationObject, UserDataTarget } from "../types";
const { getUTCTimestamp } = require("../utils");
const { defaultFormData } = require("../data/defaultFormData");

// Read product codes from database
let validCodes: CodesLog = {};
let usedCodes: CodesLog = {};

const validRef = db.ref("adminData/accessCodes/valid");
const usedRef = db.ref("adminData/accessCodes/used");
validRef.on("value", (snapshot: any) => {
  validCodes = snapshot.val() || {};
});
usedRef.on("value", (snapshot: any) => {
  usedCodes = snapshot.val() || {};
});

// Request handlers
registerRouter.post(
  "/newuser",
  (req: express.Request, res: express.Response) => {
    const submission: RegistrationObject = req.body.registrationObject;
    const validation = validateRegister(submission);
    if (validation == "Success") {
      makeAccount(submission).then((result) => {
        res.send(result);
      });
    } else {
      logRegAttempt("fail", submission, validation);
      res.send(validation);
    }
  }
);

// Helper functions
const validateRegister = ({
  email,
  password,
  confirmPassword,
  confName,
  commName,
  productCode,
}: RegistrationObject) => {
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
    productCode in validCodes,
  ];
  const errors = [
    "Fields Incomplete",
    "Invalid Email",
    "Password must be 8 or more characters",
    "Passwords do not match",
    "Invalid product code",
  ];

  for (let i = 0; i < checks.length; i++) {
    if (!checks[i]) return errors[i];
  }

  if (checks.every((check) => check === true)) {
    return "Success";
  } else {
    return "Registration failed";
  }
};

const validateEmail = (email: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

const makeAccount = (submission: RegistrationObject) => {
  const { email, password, confName, commName, productCode } = submission;

  return new Promise((resolve) => {
    auth
      .createUser({
        email: email,
        password: password,
      })
      .then((userCredential: any) => {
        const uid: string = userCredential.uid;
        writeToUser(uid, "settings", {
          committee: commName,
          conference: confName,
        });
        writeToUser(uid, "form", defaultFormData);
        killProductCode(productCode);
        logRegAttempt("success", submission, "Passing", uid);
        resolve("Success");
      })
      .catch((error: any) => {
        const message = `Registration error (${error.code}): ${error.message}`;
        logRegAttempt(
          "fail",
          submission,
          `Firebase error (${error.code}): ${error.message}`
        );
        resolve(message);
      });
  });
};

const killProductCode = (usedCode: string) => {
  const UTCTimestamp = getUTCTimestamp();

  // Remove used code from list of valids
  validRef.child(usedCode).set(null);
  // Log the code as claimed with timestamp
  usedRef.child(usedCode).set(UTCTimestamp);
};

const writeToUser = (uid: string, target: UserDataTarget, content: any) => {
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
    const ref = db.ref(`appdata/${uid}/livedata/${target}`);
    ref.set(content);
  }
};

const logRegAttempt = (
  outcome: "success" | "fail",
  submission: RegistrationObject,
  reason = "",
  uid = ""
) => {
  const timestamp = getUTCTimestamp();
  if (outcome === "success") {
    console.log(
      `[${timestamp}] Created user [E: ${submission.email}] [UID: ${uid}] using code "${submission.productCode}"`
    );
  } else if (outcome === "fail") {
    console.log(
      `[${timestamp}] Failed to register [E: ${submission.email}] [Conf: ${submission.confName}] [Comm: ${submission.commName}], attempted code "${submission.productCode}"`
    );
    console.log(`--> Reason: ${reason}`);
  }
};

module.exports = { registerRouter };
