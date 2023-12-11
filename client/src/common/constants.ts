import { DelegateAPI } from "../delegate_side/DelegateApp";
import { StaffAPI, StaffAccountInfo } from "../staff_side/StaffApp";
import { Directive } from "./types/directiveTypes";
import { Question } from "./types/questionTypes";
import {
  FirebaseDataStaff,
  Delegate,
  Notes,
  Settings,
  AccountType,
  StaffPageKey,
} from "./types/types";

// Links
export const CUSTOM_BACKEND_URL = "https://munsuite-backend.onrender.com";
export const LINCOLN_LINKEDIN =
  "https://www.linkedin.com/in/lincoln-seungha-lee/";
export const INQUIRY_EMAIL = "info@munsuite.com";

// Blank Types
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

export const BLANK_APPDATA: FirebaseDataStaff = {
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

export const BLANK_HOST_ACCOUNT_INFO: StaffAccountInfo = {
  type: AccountType.Premium,
  expiration: "Error",
  email: null,
};

export const BLANK_STAFFAPI: StaffAPI = {
  userID: null,
  page: StaffPageKey.Delegations,
  setPage: (p) => {},
  accountInfo: BLANK_STAFF_ACCOUNT_INFO,
  setAccountInfo: (i) => {},
};

export const BLANK_DELEGATEAPI: DelegateAPI = {
  user: null,
  setUser: (u) => {},
  hostAccountInfo: BLANK_HOST_ACCOUNT_INFO,
};
