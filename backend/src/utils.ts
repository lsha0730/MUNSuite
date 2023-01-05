const { db } = require("./firebase");
import { AccountType, UserDataTarget, UTCString } from "./types";

/* Returns the current UTC time as a string in the format
    YYYY-MM-DD HH:MM:SS UTC
    2022-12-25 08:01:10 UTC
*/
const getUTCTimestamp = (): UTCString => {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // January is 0
  const day = date.getUTCDate().toString().padStart(2, "0");
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

const setAccountType = (uid: string, type: AccountType) => {
  const ref = db.ref(`adminData/accounts/${uid}/type`);
  ref.set(type);
};

module.exports = { getUTCTimestamp, writeToUser, setAccountType };
