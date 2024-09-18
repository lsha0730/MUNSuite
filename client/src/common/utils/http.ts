import axios from "axios";
import { StaffAccountInfo } from "../../staff_side/StaffApp";
import {
  Auth,
  UserCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { syntaxCheckEmail } from "./utils";

/**
 * Gets the MUNSuite account's profile information.
 *
 * @param {string} uid - The user ID of the MUNSuite account.
 * @param {function} callback - A callback function to take the account info once ready.
 */
export async function getHostAccountInfo(
  uid: string,
  callback: (data: StaffAccountInfo) => void
) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/account/info`;
  const body = { uid };
  const response = await axios.post(url, body);
  callback(response.data as StaffAccountInfo);
}

export type RegistrationObject = {
  email: string;
  password: string;
  confirmPassword: string;
  confName: string;
  commName: string;
  eula: boolean;
};

/**
 * Registers a new MUNSuite account.
 *
 * @param {Auth} auth - The firebase auth session object.
 * @param {RegistrationObject} registrationObject - An object containing the profile information the user is registering with.
 *
 * @throws {Error(string)} An error containing an error message
 */
export async function registerAccount(
  auth: Auth,
  registrationObject: RegistrationObject
): Promise<UserCredential> {
  if (!validateRegistrationObject(registrationObject))
    throw new Error("Invalid registration info");
  const url = `${process.env.REACT_APP_BACKEND_URL}/register/newuser`;
  const body = { registrationObject };
  const { data: resultMessage }: { data: string } = await axios.post(url, body);
  if (resultMessage == "Success") {
    const userCreds = await signInWithEmailAndPassword(
      auth,
      registrationObject.email,
      registrationObject.password
    );
    return userCreds;
  } else {
    throw new Error(resultMessage);
  }
}

/**
 * Checks if a registration object contains information that is good for sending to the backend.
 * @param {RegistrationObject} registrationObject - An object containing the profile information the user is registering with.
 *
 * @returns {boolean} True if object is valid, False otherwise
 */
function validateRegistrationObject({
  email,
  password,
  confirmPassword,
  confName,
  commName,
  eula,
}: RegistrationObject): string | true {
  const complete = [email, password, confirmPassword, confName, commName].every(
    (e) => (e || "") !== ""
  );
  const checks = [
    { validity: complete, errMsg: "Fields Incomplete" },
    { validity: syntaxCheckEmail(email), errMsg: "Invalid Email" },
    {
      validity: password.length >= 8,
      errMsg: "Password must be 8 or more characters",
    },
    { validity: password == confirmPassword, errMsg: "Passwords do not match" },
    { validity: eula, errMsg: "Please agree to the EULA" },
  ];
  for (const check of checks) if (!check.validity) return check.errMsg;
  return true;
}
