const { db } = require("./firebase");
import { AccountType, UserDataTarget, UTCString, DateOffset } from "./types";

/* Returns the current UTC time as a string in the format
    YYYY-MM-DD HH:MM:SS UTC
    2022-12-25 08:01:10 UTC
*/
const getUTCTimestamp = (offset?: DateOffset): UTCString => {
  const date = new Date();
  const year = date.getUTCFullYear() + (offset?.year || 0);
  const month = (date.getUTCMonth() + 1 + (offset?.month || 0))
    .toString()
    .padStart(2, "0"); // January is 0
  const day = (date.getUTCDate() + (offset?.day || 0))
    .toString()
    .padStart(2, "0");
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;
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

const updateAccountType = (uid: string, type: AccountType) => {
  const ref = db.ref(`adminData/accounts/${uid}`);
  ref.child("/type").set(type);

  if (type === "Premium") {
    const threeMonthsFuture = getUTCTimestamp({ month: 3 });
    ref.child("/expiration").set(threeMonthsFuture);
  } else {
    ref.child("/expiration").set(null);
  }
};

module.exports = { getUTCTimestamp, writeToUser, updateAccountType };
