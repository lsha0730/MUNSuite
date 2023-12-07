import { StaffAPI, StaffAccountInfo } from "../staff_side/StaffApp";
import { Directive } from "./types/directiveTypes";
import { Question } from "./types/questionTypes";
import {
  FirebaseData,
  Delegate,
  Notes,
  Settings,
  AccountType,
} from "./types/types";

export const CUSTOM_BACKEND_URL = "https://munsuite-backend.onrender.com";

export const BLANK_DELEGATIONS: Delegate[] = [];
export const BLANK_FORM: Question[] = [];
export const BLANK_PENDINGS: Directive[] = [];
export const BLANK_PROCESSED: Directive[] = [];
export const BLANK_NOTES: Notes = {
  individual: [],
  quick: "",
};
export const BLANK_SETTINGS: Settings = {
  conference: "MUNSuite",
  committee: "Committee",
  formOpen: true,
  standardForm: true,
};

export const BLANK_APPDATA: FirebaseData = {
  delegations: BLANK_DELEGATIONS,
  form: BLANK_FORM,
  pendings: BLANK_PENDINGS,
  processed: BLANK_PROCESSED,
  notes: BLANK_NOTES,
  settings: BLANK_SETTINGS,
};

export const BLANK_STAFF_ACCOUNT_INFO: StaffAccountInfo = {
  type: AccountType.Starter,
  expiration: "Error",
  email: null,
};

export const BLANK_STAFFAPI: StaffAPI = {
  userID: null,
  page: "delegations",
  setPage: (p) => {},
  accountInfo: BLANK_STAFF_ACCOUNT_INFO,
  setAccountInfo: (i) => {},
};
