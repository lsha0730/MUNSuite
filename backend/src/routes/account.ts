const { db, auth } = require("../firebase");

import express = require("express");
const accountRouter = express.Router();
accountRouter.use(express.json());

const { getUTCTimestamp, updateAccountType } = require("../utils");
import { AccountsLog, CodesLog } from "../types";

// Read product codes & account types from database
let validCodes: CodesLog = {};
let usedCodes: CodesLog = {};
let accounts: AccountsLog = {};

const validRef = db.ref("adminData/accessCodes/valid");
const usedRef = db.ref("adminData/accessCodes/used");
const accountTypeRef = db.ref("adminData/accounts");
validRef.on("value", (snapshot: any) => {
  validCodes = snapshot.val() || {};
});
usedRef.on("value", (snapshot: any) => {
  usedCodes = snapshot.val() || {};
});
accountTypeRef.on("value", (snapshot: any) => {
  accounts = snapshot.val() || {};
});

// Request handlers
accountRouter.post("/redeem", (req: express.Request, res: express.Response) => {
  const productCode: string = req.body.code;
  const uid: string = req.body.uid;

  if (!(productCode in validCodes)) {
    logUpgrade("fail", uid, productCode);
    res.send("Invalid code");
  } else if (!accounts?.[uid]) {
    logUpgrade("fail", uid, productCode);
    res.send("Invalid UID");
  } else if (accounts?.[uid].type === "Premium") {
    logUpgrade("fail", uid, productCode);
    res.send("Already Premium");
  } else {
    updateAccountType(uid, "Premium");
    killProductCode(productCode);
    logUpgrade("success", uid, productCode);
    res.send("Success");
  }
});

accountRouter.post("/info", (req: express.Request, res: express.Response) => {
  const uid: string = req.body.uid;

  getEmailFromUid(uid).then((email: string | null) => {
    const accountInfo = accounts?.[uid];

    if (!accountInfo && !email) {
      res.send(null);
    } else if (!accountInfo) {
      res.send({
        email: email,
      });
    } else if (!email) {
      res.send(accountInfo);
    } else {
      res.send({
        ...accountInfo,
        email: email,
      });
    }
  });
});

// Helper functions
const getEmailFromUid = async (uid: string) => {
  const userRecord = await auth.getUser(uid);
  return userRecord?.toJSON()?.email || null;
};

const killProductCode = (usedCode: string) => {
  const UTCTimestamp = getUTCTimestamp();

  // Remove used code from list of valids
  validRef.child(usedCode).set(null);
  // Log the code as claimed with timestamp
  usedRef.child(usedCode).set(UTCTimestamp);
};

const logUpgrade = (status: "success" | "fail", uid: string, code: string) => {
  const timestamp = getUTCTimestamp();
  if (status === "success") {
    console.log(
      `[${timestamp}] Upgraded user [UID: ${uid}] using code "${code}"`
    );
  } else {
    console.log(
      `[${timestamp}] Failed upgrade attempt on user [UID: ${uid}] using code "${code}"`
    );
  }
};

module.exports = { accountRouter };
