const { auth } = require("../firebase");

import express = require("express");
const registerRouter = express.Router();
registerRouter.use(express.json());

import { RegistrationObject } from "../types";
const { getUTCTimestamp, writeToUser, setAccountType } = require("../utils");
const { defaultFormData } = require("../data/defaultFormData");

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
}: RegistrationObject) => {
  const complete = [email, password, confirmPassword, confName, commName].every(
    (e) => (e || "") != ""
  );

  const checks = [
    complete,
    validateEmail(email),
    password.length >= 8,
    password == confirmPassword,
  ];
  const errors = [
    "Fields Incomplete",
    "Invalid Email",
    "Password must be 8 or more characters",
    "Passwords do not match",
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
  const { email, password, confName, commName } = submission;

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
        setAccountType(uid, "Starter");

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

const logRegAttempt = (
  outcome: "success" | "fail",
  submission: RegistrationObject,
  reason = "",
  uid = ""
) => {
  const timestamp = getUTCTimestamp();
  if (outcome === "success") {
    console.log(
      `[${timestamp}] Created user [E: ${submission.email}] [UID: ${uid}]`
    );
  } else if (outcome === "fail") {
    console.log(
      `[${timestamp}] Failed to register [E: ${submission.email}] [Conf: ${submission.confName}] [Comm: ${submission.commName}], ${reason}`
    );
  }
};

module.exports = { registerRouter };
