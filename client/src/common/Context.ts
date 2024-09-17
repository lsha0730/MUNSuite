import { FirebaseApp } from "firebase/app";
import { Auth, User } from "firebase/auth";
import { createContext } from "react";
import { FirebaseDataDelegate, FirebaseDataStaff } from "./types/types";
import { StaffAPI } from "../staff_side/StaffApp";
import { BLANK_APPDATA, BLANK_DELEGATEAPI, BLANK_STAFFAPI } from "./constants";
import { Database } from "firebase/database";
import { Analytics } from "firebase/analytics";
import { DelegateAPI } from "../delegate_side/DelegateApp";

interface AppContext {
  app: FirebaseApp | null;
  auth: Auth | null;
  database: Database | null;
  analytics: Analytics | null;
  user: User | null;
  isPortrait: boolean;
}

interface StaffContext {
  staffAPI: StaffAPI;
  firebaseData: FirebaseDataStaff;
}

interface DelegateContext {
  delegateAPI: DelegateAPI;
  firebaseData: FirebaseDataDelegate;
}

const DEFAULT_APPCONTEXT = {
  app: null,
  auth: null,
  database: null,
  analytics: null,
  user: null,
  isPortrait: false,
};

const DEFAULT_STAFFCONTEXT: StaffContext = {
  staffAPI: BLANK_STAFFAPI,
  firebaseData: BLANK_APPDATA,
};

const DEFAULT_DELEGATECONTEXT: DelegateContext = {
  delegateAPI: BLANK_DELEGATEAPI,
  firebaseData: BLANK_APPDATA,
};

export const appContext = createContext<AppContext>(DEFAULT_APPCONTEXT);
export const staffContext = createContext<StaffContext>(DEFAULT_STAFFCONTEXT);
export const delegateContext = createContext<DelegateContext>(
  DEFAULT_DELEGATECONTEXT
);
